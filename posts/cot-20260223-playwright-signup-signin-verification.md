# COT: Playwright Automation - Signup/Signin Flow with Email Verification

**Question:** Step-by-step setup Playwright để auto signup, signin, check email confirmation, verify  
**Date:** 2026-02-23  
**Use Cases:** Testing own apps, personal automation, learning

---

## ⚠️ Legal & Ethical Notice

| Use Case | Status |
|----------|--------|
| Testing your own application | ✅ Legal |
| Personal account automation | ⚠️ Check platform ToS |
| Mass account creation | ❌ Spam, likely illegal |
| Bypassing anti-bot measures | ❌ CFAA violation risk |

**This guide assumes you're testing YOUR OWN application or learning.**

---

## Architecture Overview

```
┌────────────────────────────────────────────────────────────────┐
│                    AUTOMATION FLOW                              │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐    │
│  │   SIGNUP     │────▶│ CHECK EMAIL  │────▶│   VERIFY     │    │
│  │   FORM       │     │  (IMAP/API)  │     │   CODE       │    │
│  └──────────────┘     └──────────────┘     └──────────────┘    │
│         │                    │                    │             │
│         ▼                    ▼                    ▼             │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐    │
│  │ Playwright   │     │ Email Client │     │ Playwright   │    │
│  │ Browser      │     │ (IMAP/Gmail) │     │ Browser      │    │
│  └──────────────┘     └──────────────┘     └──────────────┘    │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## Step 1: Environment Setup

### 1.1 Install Dependencies

```bash
# Create project
mkdir playwright-automation
cd playwright-automation

# Python setup
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# Install packages
pip install playwright
pip install imapclient    # For email checking
pip install beautifulsoup4 # For parsing email HTML
pip install python-dotenv  # For env variables

# Install browsers
playwright install chromium
```

### 1.2 Project Structure

```
playwright-automation/
├── .env                    # Credentials (gitignored)
├── config.py               # Configuration
├── email_client.py         # Email checking logic
├── signup_flow.py          # Main automation
├── utils.py                # Helper functions
└── tests/
    └── test_signup.py      # Test cases
```

### 1.3 Environment Variables (.env)

```env
# Email for receiving verification codes
EMAIL_ADDRESS=your-test-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_IMAP_SERVER=imap.gmail.com

# Target platform (for testing YOUR OWN app)
TARGET_URL=https://your-app.com
```

**For Gmail, use App Password:**
1. Enable 2FA on Google account
2. Go to https://myaccount.google.com/apppasswords
3. Generate app password for "Mail"

---

## Step 2: Email Client Setup

### 2.1 IMAP Email Checker

```python
# email_client.py
import imaplib
import email
from email.header import decode_header
import re
import time
from bs4 import BeautifulSoup
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()

class EmailClient:
    def __init__(self):
        self.server = os.getenv('EMAIL_IMAP_SERVER', 'imap.gmail.com')
        self.email = os.getenv('EMAIL_ADDRESS')
        self.password = os.getenv('EMAIL_PASSWORD')
        self.connection = None
    
    def connect(self):
        """Connect to IMAP server"""
        self.connection = imaplib.IMAP4_SSL(self.server)
        self.connection.login(self.email, self.password)
        self.connection.select('INBOX')
        print(f"✅ Connected to {self.server}")
    
    def disconnect(self):
        """Disconnect from IMAP server"""
        if self.connection:
            self.connection.logout()
            print("✅ Disconnected from email server")
    
    def wait_for_email(
        self, 
        subject_contains: str = None,
        from_contains: str = None,
        timeout: int = 120,
        poll_interval: int = 5
    ) -> Optional[dict]:
        """
        Wait for email matching criteria
        Returns: {subject, from, body_text, body_html, verification_code}
        """
        start_time = time.time()
        
        while time.time() - start_time < timeout:
            # Search for recent unread emails
            self.connection.select('INBOX')
            _, messages = self.connection.search(None, 'UNSEEN')
            
            for msg_num in messages[0].split():
                _, msg_data = self.connection.fetch(msg_num, '(RFC822)')
                email_body = msg_data[0][1]
                msg = email.message_from_bytes(email_body)
                
                # Decode subject
                subject, encoding = decode_header(msg['Subject'])[0]
                if isinstance(subject, bytes):
                    subject = subject.decode(encoding or 'utf-8')
                
                # Decode from
                from_addr = msg['From']
                
                # Check if matches criteria
                if subject_contains and subject_contains.lower() not in subject.lower():
                    continue
                if from_contains and from_contains.lower() not in from_addr.lower():
                    continue
                
                # Extract body
                body_text = ""
                body_html = ""
                
                if msg.is_multipart():
                    for part in msg.walk():
                        content_type = part.get_content_type()
                        if content_type == 'text/plain':
                            body_text = part.get_payload(decode=True).decode()
                        elif content_type == 'text/html':
                            body_html = part.get_payload(decode=True).decode()
                else:
                    body_text = msg.get_payload(decode=True).decode()
                
                # Extract verification code (common patterns)
                verification_code = self.extract_verification_code(body_text or body_html)
                
                return {
                    'subject': subject,
                    'from': from_addr,
                    'body_text': body_text,
                    'body_html': body_html,
                    'verification_code': verification_code
                }
            
            print(f"⏳ Waiting for email... ({int(time.time() - start_time)}s)")
            time.sleep(poll_interval)
        
        print("❌ Timeout waiting for email")
        return None
    
    def extract_verification_code(self, content: str) -> Optional[str]:
        """Extract verification code from email content"""
        # Common patterns for verification codes
        patterns = [
            r'verification code[:\s]+(\d{4,8})',  # "verification code: 123456"
            r'code[:\s]+(\d{4,8})',                # "code: 123456"
            r'OTP[:\s]+(\d{4,8})',                 # "OTP: 123456"
            r'\b(\d{6})\b',                        # Standalone 6-digit number
            r'confirm[:\s]+(\d{4,8})',             # "confirm: 123456"
        ]
        
        for pattern in patterns:
            match = re.search(pattern, content, re.IGNORECASE)
            if match:
                return match.group(1)
        
        # Try to find link with token
        link_pattern = r'https?://[^\s<>"]+(?:verify|confirm|activate)[^\s<>"]*'
        link_match = re.search(link_pattern, content, re.IGNORECASE)
        if link_match:
            return link_match.group(0)  # Return full verification link
        
        return None
    
    def extract_verification_link(self, html_content: str) -> Optional[str]:
        """Extract verification link from HTML email"""
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Find links containing verification keywords
        keywords = ['verify', 'confirm', 'activate', 'validate']
        
        for link in soup.find_all('a', href=True):
            href = link['href']
            text = link.get_text().lower()
            
            for keyword in keywords:
                if keyword in href.lower() or keyword in text:
                    return href
        
        return None


# Usage example
if __name__ == "__main__":
    client = EmailClient()
    client.connect()
    
    email_data = client.wait_for_email(
        subject_contains="verification",
        timeout=60
    )
    
    if email_data:
        print(f"📧 Found email: {email_data['subject']}")
        print(f"🔑 Code: {email_data['verification_code']}")
    
    client.disconnect()
```

### 2.2 Alternative: Gmail API (More Reliable)

```python
# gmail_client.py
# For production, use Gmail API instead of IMAP
# Requires OAuth2 setup

from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
import base64

class GmailClient:
    def __init__(self, credentials_path: str):
        creds = Credentials.from_authorized_user_file(credentials_path)
        self.service = build('gmail', 'v1', credentials=creds)
    
    def get_recent_messages(self, query: str = '', max_results: int = 10):
        results = self.service.users().messages().list(
            userId='me',
            q=query,
            maxResults=max_results
        ).execute()
        
        messages = []
        for msg in results.get('messages', []):
            msg_data = self.service.users().messages().get(
                userId='me',
                id=msg['id'],
                format='full'
            ).execute()
            messages.append(msg_data)
        
        return messages
```

### 2.3 Temporary Email Services (For Testing)

```python
# temp_email.py
# Using temporary email APIs for testing

import requests
import time

class TempMailClient:
    """Using Guerrilla Mail API (free, no signup)"""
    
    def __init__(self):
        self.base_url = "https://api.guerrillamail.com/ajax.php"
        self.session = requests.Session()
        self.email_address = None
        self.sid_token = None
    
    def get_email_address(self) -> str:
        """Get a temporary email address"""
        response = self.session.get(
            self.base_url,
            params={'f': 'get_email_address'}
        )
        data = response.json()
        self.email_address = data['email_addr']
        self.sid_token = data['sid_token']
        return self.email_address
    
    def check_inbox(self, seq: int = 0) -> list:
        """Check for new emails"""
        response = self.session.get(
            self.base_url,
            params={
                'f': 'check_email',
                'seq': seq,
                'sid_token': self.sid_token
            }
        )
        return response.json().get('list', [])
    
    def wait_for_email(self, timeout: int = 120, poll_interval: int = 5) -> dict:
        """Wait for incoming email"""
        start = time.time()
        seq = 0
        
        while time.time() - start < timeout:
            emails = self.check_inbox(seq)
            if emails:
                return emails[0]
            time.sleep(poll_interval)
        
        return None


# Usage
if __name__ == "__main__":
    temp = TempMailClient()
    email = temp.get_email_address()
    print(f"📧 Temporary email: {email}")
    
    # Use this email for signup, then:
    print("⏳ Waiting for verification email...")
    incoming = temp.wait_for_email(timeout=120)
    
    if incoming:
        print(f"✅ Received: {incoming.get('mail_subject')}")
```

---

## Step 3: Playwright Browser Automation

### 3.1 Basic Signup Flow

```python
# signup_flow.py
from playwright.sync_api import sync_playwright, Page, Browser
from email_client import EmailClient
import time
import random
import string
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()

class SignupAutomation:
    def __init__(self, headless: bool = False):
        self.headless = headless
        self.browser: Browser = None
        self.page: Page = None
        self.email_client = EmailClient()
    
    def start_browser(self):
        """Initialize browser with anti-detection measures"""
        playwright = sync_playwright().start()
        
        self.browser = playwright.chromium.launch(
            headless=self.headless,
            args=[
                '--disable-blink-features=AutomationControlled',
                '--no-sandbox',
            ]
        )
        
        # Create context with realistic settings
        context = self.browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            locale='en-US',
            timezone_id='America/New_York',
        )
        
        self.page = context.new_page()
        
        # Remove webdriver flag
        self.page.add_init_script("""
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined
            });
        """)
        
        print("✅ Browser started")
    
    def stop_browser(self):
        """Close browser"""
        if self.browser:
            self.browser.close()
            print("✅ Browser closed")
    
    def human_type(self, selector: str, text: str):
        """Type with human-like delays"""
        self.page.click(selector)
        for char in text:
            self.page.type(selector, char, delay=random.randint(50, 150))
            time.sleep(random.uniform(0.01, 0.05))
    
    def random_delay(self, min_sec: float = 0.5, max_sec: float = 2.0):
        """Random delay to appear human"""
        time.sleep(random.uniform(min_sec, max_sec))
    
    def generate_random_password(self, length: int = 12) -> str:
        """Generate random password"""
        chars = string.ascii_letters + string.digits + "!@#$%"
        return ''.join(random.choice(chars) for _ in range(length))
    
    def signup(
        self,
        url: str,
        email: str,
        password: str = None,
        username: str = None,
        # Selectors - customize for your app
        email_selector: str = 'input[name="email"]',
        password_selector: str = 'input[name="password"]',
        username_selector: str = 'input[name="username"]',
        submit_selector: str = 'button[type="submit"]',
    ) -> dict:
        """
        Complete signup flow
        Returns: {success, email, password, verification_code}
        """
        result = {
            'success': False,
            'email': email,
            'password': password or self.generate_random_password(),
            'username': username,
            'verification_code': None,
            'error': None
        }
        
        try:
            # Navigate to signup page
            print(f"🌐 Navigating to {url}")
            self.page.goto(url, wait_until='networkidle')
            self.random_delay()
            
            # Fill email
            print(f"📧 Entering email: {email}")
            self.human_type(email_selector, email)
            self.random_delay(0.3, 0.8)
            
            # Fill username if required
            if username and self.page.query_selector(username_selector):
                print(f"👤 Entering username: {username}")
                self.human_type(username_selector, username)
                self.random_delay(0.3, 0.8)
            
            # Fill password
            print(f"🔑 Entering password")
            self.human_type(password_selector, result['password'])
            self.random_delay(0.3, 0.8)
            
            # Submit form
            print("📤 Submitting form")
            self.page.click(submit_selector)
            
            # Wait for navigation or success indicator
            self.page.wait_for_load_state('networkidle', timeout=10000)
            self.random_delay(1, 2)
            
            # Check for success (customize based on your app)
            if self.page.query_selector('.success-message') or 'verify' in self.page.url.lower():
                print("✅ Signup submitted successfully")
                result['success'] = True
            else:
                # Check for error messages
                error_el = self.page.query_selector('.error-message, .alert-danger')
                if error_el:
                    result['error'] = error_el.inner_text()
                    print(f"❌ Error: {result['error']}")
            
        except Exception as e:
            result['error'] = str(e)
            print(f"❌ Exception: {e}")
        
        return result
    
    def get_verification_code(
        self,
        subject_contains: str = "verification",
        from_contains: str = None,
        timeout: int = 120
    ) -> Optional[str]:
        """Wait for and extract verification code from email"""
        print(f"📬 Waiting for verification email (timeout: {timeout}s)")
        
        self.email_client.connect()
        
        email_data = self.email_client.wait_for_email(
            subject_contains=subject_contains,
            from_contains=from_contains,
            timeout=timeout
        )
        
        self.email_client.disconnect()
        
        if email_data:
            code = email_data.get('verification_code')
            print(f"🔑 Verification code/link: {code}")
            return code
        
        print("❌ No verification email received")
        return None
    
    def verify_account(
        self,
        verification_code: str,
        verification_url: str = None,
        code_input_selector: str = 'input[name="code"]',
        submit_selector: str = 'button[type="submit"]'
    ) -> bool:
        """
        Verify account using code or link
        """
        try:
            # If verification code is a URL, navigate to it
            if verification_code.startswith('http'):
                print(f"🔗 Navigating to verification link")
                self.page.goto(verification_code, wait_until='networkidle')
                self.random_delay(1, 2)
                
                # Check for success
                if 'success' in self.page.url.lower() or 'verified' in self.page.content().lower():
                    print("✅ Account verified via link")
                    return True
            else:
                # Navigate to verification page if needed
                if verification_url:
                    self.page.goto(verification_url, wait_until='networkidle')
                    self.random_delay()
                
                # Enter verification code
                print(f"🔢 Entering verification code: {verification_code}")
                self.human_type(code_input_selector, verification_code)
                self.random_delay(0.5, 1)
                
                # Submit
                self.page.click(submit_selector)
                self.page.wait_for_load_state('networkidle', timeout=10000)
                self.random_delay(1, 2)
                
                # Check for success
                if self.page.query_selector('.success-message') or 'dashboard' in self.page.url.lower():
                    print("✅ Account verified via code")
                    return True
            
            print("❌ Verification may have failed")
            return False
            
        except Exception as e:
            print(f"❌ Verification error: {e}")
            return False
    
    def full_signup_flow(
        self,
        signup_url: str,
        email: str,
        password: str = None,
        username: str = None,
        selectors: dict = None
    ) -> dict:
        """
        Complete end-to-end signup flow
        """
        default_selectors = {
            'email': 'input[name="email"], input[type="email"]',
            'password': 'input[name="password"], input[type="password"]',
            'username': 'input[name="username"]',
            'submit': 'button[type="submit"], input[type="submit"]',
            'code': 'input[name="code"], input[name="verification"]',
        }
        selectors = {**default_selectors, **(selectors or {})}
        
        result = {
            'success': False,
            'email': email,
            'password': password,
            'username': username,
            'steps': []
        }
        
        try:
            # Step 1: Start browser
            self.start_browser()
            result['steps'].append('browser_started')
            
            # Step 2: Signup
            signup_result = self.signup(
                url=signup_url,
                email=email,
                password=password,
                username=username,
                email_selector=selectors['email'],
                password_selector=selectors['password'],
                username_selector=selectors['username'],
                submit_selector=selectors['submit']
            )
            
            result['password'] = signup_result['password']
            
            if not signup_result['success']:
                result['error'] = signup_result.get('error', 'Signup failed')
                return result
            
            result['steps'].append('signup_completed')
            
            # Step 3: Get verification code
            verification_code = self.get_verification_code(timeout=120)
            
            if not verification_code:
                result['error'] = 'No verification email received'
                return result
            
            result['verification_code'] = verification_code
            result['steps'].append('verification_code_received')
            
            # Step 4: Verify account
            verified = self.verify_account(
                verification_code=verification_code,
                code_input_selector=selectors['code'],
                submit_selector=selectors['submit']
            )
            
            if verified:
                result['success'] = True
                result['steps'].append('account_verified')
            else:
                result['error'] = 'Verification failed'
            
        except Exception as e:
            result['error'] = str(e)
        
        finally:
            self.stop_browser()
        
        return result


# Main execution
if __name__ == "__main__":
    automation = SignupAutomation(headless=False)
    
    result = automation.full_signup_flow(
        signup_url="https://your-app.com/signup",  # Replace with YOUR app
        email="test@yourdomain.com",
        username="testuser123"
    )
    
    print("\n" + "="*50)
    print("📊 RESULT:")
    print(f"   Success: {result['success']}")
    print(f"   Email: {result['email']}")
    print(f"   Password: {result['password']}")
    print(f"   Steps: {result['steps']}")
    if result.get('error'):
        print(f"   Error: {result['error']}")
```

---

## Step 4: Signin Flow

```python
# signin_flow.py
from playwright.sync_api import sync_playwright
import json
import os

class SigninAutomation:
    def __init__(self, headless: bool = False):
        self.headless = headless
        self.browser = None
        self.context = None
        self.page = None
    
    def start_browser(self, load_session: str = None):
        """Start browser, optionally loading saved session"""
        playwright = sync_playwright().start()
        
        self.browser = playwright.chromium.launch(headless=self.headless)
        
        if load_session and os.path.exists(load_session):
            # Load saved session (cookies, localStorage)
            self.context = self.browser.new_context(storage_state=load_session)
            print(f"✅ Loaded session from {load_session}")
        else:
            self.context = self.browser.new_context()
        
        self.page = self.context.new_page()
    
    def save_session(self, path: str):
        """Save current session for reuse"""
        self.context.storage_state(path=path)
        print(f"✅ Session saved to {path}")
    
    def signin(
        self,
        url: str,
        email: str,
        password: str,
        email_selector: str = 'input[name="email"]',
        password_selector: str = 'input[name="password"]',
        submit_selector: str = 'button[type="submit"]',
        success_indicator: str = None  # Selector to verify login success
    ) -> bool:
        """
        Sign in to account
        """
        try:
            print(f"🌐 Navigating to {url}")
            self.page.goto(url, wait_until='networkidle')
            
            # Check if already logged in
            if success_indicator and self.page.query_selector(success_indicator):
                print("✅ Already logged in")
                return True
            
            # Fill credentials
            print(f"📧 Entering email: {email}")
            self.page.fill(email_selector, email)
            
            print("🔑 Entering password")
            self.page.fill(password_selector, password)
            
            # Submit
            print("📤 Submitting login form")
            self.page.click(submit_selector)
            self.page.wait_for_load_state('networkidle', timeout=15000)
            
            # Verify login success
            if success_indicator:
                if self.page.query_selector(success_indicator):
                    print("✅ Login successful")
                    return True
                else:
                    print("❌ Login may have failed")
                    return False
            
            # Fallback: check URL changed
            if 'login' not in self.page.url.lower() and 'signin' not in self.page.url.lower():
                print("✅ Login appears successful")
                return True
            
            return False
            
        except Exception as e:
            print(f"❌ Login error: {e}")
            return False
    
    def signin_with_2fa(
        self,
        url: str,
        email: str,
        password: str,
        get_2fa_code_func,  # Function that returns 2FA code
        code_selector: str = 'input[name="code"]',
        **kwargs
    ) -> bool:
        """
        Sign in with 2FA support
        """
        # First do normal signin
        if not self.signin(url, email, password, **kwargs):
            return False
        
        # Check if 2FA page appeared
        if self.page.query_selector(code_selector):
            print("🔐 2FA required")
            
            # Get 2FA code (could be from email, authenticator app, etc.)
            code = get_2fa_code_func()
            
            if not code:
                print("❌ Failed to get 2FA code")
                return False
            
            print(f"🔢 Entering 2FA code")
            self.page.fill(code_selector, code)
            self.page.click('button[type="submit"]')
            self.page.wait_for_load_state('networkidle')
            
            print("✅ 2FA completed")
        
        return True


# Usage
if __name__ == "__main__":
    signin = SigninAutomation(headless=False)
    signin.start_browser()
    
    success = signin.signin(
        url="https://your-app.com/login",
        email="test@example.com",
        password="your-password",
        success_indicator=".dashboard, .user-menu"
    )
    
    if success:
        signin.save_session("session.json")
    
    input("Press Enter to close browser...")
    signin.browser.close()
```

---

## Step 5: Complete Example Script

```python
# main.py
from signup_flow import SignupAutomation
from signin_flow import SigninAutomation
from temp_email import TempMailClient
import json

def test_signup_with_temp_email():
    """Test signup using temporary email"""
    
    # Get temporary email
    temp_mail = TempMailClient()
    temp_email = temp_mail.get_email_address()
    print(f"📧 Using temp email: {temp_email}")
    
    # Start signup automation
    automation = SignupAutomation(headless=False)
    automation.start_browser()
    
    # Do signup
    result = automation.signup(
        url="https://your-app.com/signup",
        email=temp_email,
        username="testuser" + str(int(time.time())),
    )
    
    if result['success']:
        print("✅ Signup form submitted")
        
        # Wait for verification email using temp mail
        print("⏳ Waiting for verification email...")
        email_data = temp_mail.wait_for_email(timeout=120)
        
        if email_data:
            # Extract code from email body
            code = automation.email_client.extract_verification_code(
                email_data.get('mail_body', '')
            )
            
            if code:
                # Verify account
                verified = automation.verify_account(code)
                
                if verified:
                    print("🎉 Account created and verified!")
                    
                    # Save credentials
                    with open('account.json', 'w') as f:
                        json.dump({
                            'email': temp_email,
                            'password': result['password'],
                        }, f, indent=2)
    
    automation.stop_browser()


def test_signin_with_saved_session():
    """Test signin using saved session"""
    
    signin = SigninAutomation(headless=False)
    signin.start_browser(load_session="session.json")
    
    # Navigate to protected page
    signin.page.goto("https://your-app.com/dashboard")
    signin.page.wait_for_load_state('networkidle')
    
    # Check if session is still valid
    if "login" not in signin.page.url.lower():
        print("✅ Session still valid!")
    else:
        print("⚠️ Session expired, need to re-login")
        
        # Re-login
        with open('account.json', 'r') as f:
            creds = json.load(f)
        
        signin.signin(
            url="https://your-app.com/login",
            email=creds['email'],
            password=creds['password']
        )
        
        # Save new session
        signin.save_session("session.json")
    
    input("Press Enter to close...")
    signin.browser.close()


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == 'signin':
        test_signin_with_saved_session()
    else:
        test_signup_with_temp_email()
```

---

## Step 6: Anti-Detection Measures

```python
# stealth.py
# Additional anti-detection techniques

def apply_stealth(page):
    """Apply stealth measures to avoid bot detection"""
    
    stealth_js = """
    // Overwrite navigator.webdriver
    Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined
    });
    
    // Overwrite chrome
    window.chrome = {
        runtime: {}
    };
    
    // Overwrite permissions
    const originalQuery = window.navigator.permissions.query;
    window.navigator.permissions.query = (parameters) => (
        parameters.name === 'notifications' ?
            Promise.resolve({ state: Notification.permission }) :
            originalQuery(parameters)
    );
    
    // Overwrite plugins
    Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5]
    });
    
    // Overwrite languages
    Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en']
    });
    """
    
    page.add_init_script(stealth_js)


def random_mouse_movements(page):
    """Simulate random mouse movements"""
    import random
    
    for _ in range(random.randint(2, 5)):
        x = random.randint(100, 800)
        y = random.randint(100, 600)
        page.mouse.move(x, y)
        time.sleep(random.uniform(0.1, 0.3))


def human_scroll(page):
    """Simulate human scrolling"""
    import random
    
    for _ in range(random.randint(1, 3)):
        page.mouse.wheel(0, random.randint(100, 300))
        time.sleep(random.uniform(0.3, 0.8))
```

---

## Summary

| Component | Purpose |
|-----------|---------|
| `email_client.py` | IMAP email checking, code extraction |
| `temp_email.py` | Temporary email for testing |
| `signup_flow.py` | Automated signup with verification |
| `signin_flow.py` | Automated signin with session save |
| `stealth.py` | Anti-detection measures |

### Workflow

```
1. Get email (temp or real)
2. Fill signup form (Playwright)
3. Submit and wait
4. Check email for code (IMAP)
5. Enter verification code
6. Save session for future use
```

---

## ⚠️ Final Warnings

1. **Only use on YOUR OWN applications** for testing
2. **Check ToS** before automating any third-party service
3. **Don't mass-create accounts** — this is spam
4. **Use temp emails** for testing, not real user data
5. **Rate limit** your automation to avoid detection

---

*COT Analysis complete - For educational and legitimate testing purposes only*
