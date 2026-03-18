import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager


# Test Data
LOGIN_URL = "https://practicetestautomation.com/practice-test-login"
DASHBOARD_URL = "https://practicetestautomation.com/logged-in-successfully"
VALID_USERNAME = "testuser"
VALID_PASSWORD = "Password123"


@pytest.fixture(scope="function")
def browser():
    """
    Pytest fixture for setting up and tearing down the WebDriver instance.
    """
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in headless mode for CI/CD environments
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    yield driver
    driver.quit()


def test_successful_login_with_valid_credentials(browser):
    """
    Test case: Successful Login with Valid Credentials (Web - Chrome)
    """

    # Step 1: Open Chrome browser and navigate to the login page URL
    browser.get(LOGIN_URL)

    # Wait until the login page is fully loaded
    WebDriverWait(browser, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "#username"))
    )

    # Step 2: Enter a valid email address in the email field
    username_field = browser.find_element(By.CSS_SELECTOR, "#username")
    username_field.send_keys(VALID_USERNAME)

    # Step 3: Enter the correct password for the valid user in the password field
    password_field = browser.find_element(By.CSS_SELECTOR, "#password")
    password_field.send_keys(VALID_PASSWORD)

    # Step 4: Click the login button
    login_button = browser.find_element(By.CSS_SELECTOR, "#submit")
    login_button.click()

    # Step 5: Verify the user is redirected to the dashboard page
    WebDriverWait(browser, 10).until(
        EC.url_to_be(DASHBOARD_URL)
    )

    # Step 6: Verify the dashboard displays user-specific information
    assert browser.current_url == DASHBOARD_URL, "User is not redirected to the dashboard after login."

    # Additional assertion: Verify a specific element on the dashboard (if available)
    dashboard_content = WebDriverWait(browser, 10).until(
        EC.presence_of_element_located((By.TAG_NAME, "h1"))
    )
    assert "Logged In Successfully" in dashboard_content.text, "Dashboard content validation failed."
