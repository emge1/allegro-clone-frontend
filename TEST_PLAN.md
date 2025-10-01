Test Plan – Allegro Clone (UI)
1. Objective

This document defines the testing approach for the UI of Allegro Clone.
The goal is to verify key user flows (E2E, smoke, regression) using Selenium, the Page Object Model, and CI/CD integration.

2. Scope

In scope:

* E2E UI tests (Selenium + POM)

* Integration tests between UI and backend

* Parameterization (browsers, input data, headless mode)

* Reporting and CI/CD integration

Out of scope:

* Advanced performance and security testing

* Full UX/UI usability testing with end-users

3. Entry Criteria

* Stable test environment with working backend

* Available mocks for critical services if needed

* Test data prepared in JSON/CSV formats

4. Exit Criteria

* 100% smoke tests executed successfully

* 0 critical/blocker defects remaining

* Allure/JUnit reports available in CI/CD

* Screenshots attached for failed tests

5. Types of Tests

* Smoke Tests – critical user journeys (login, product purchase)

* Regression Tests – full suite for all UI functionalities

* E2E Tests – cross-browser tests with real backend

* Pairwise Tests – for large data combinations

* UI/API Integration Tests – data consistency between UI and API

6. Test Design & Structure

Page Object Model (POM):

* Each page as a separate class (e.g., LoginPage, CartPage)

* Locators and actions separated from test logic

Parameterization:

* Input data (CSV/JSON)

* Browsers (Chrome, Firefox, Edge, Headless)

* Pytest markers: @pytest.mark.smoke, @pytest.mark.regression

7. Test Techniques

* Black-box: Equivalence Partitioning (EP), Boundary Value Analysis (BVA), Decision Table Testing

* Pairwise Testing: Minimal combinations for broader coverage

* Exploratory Testing: Manual exploratory sessions for edge cases

8. Tools

* UI Automation: Selenium, Pytest, Pytest-xdist

* Reporting: Allure, JUnit

* CI/CD: GitHub Actions, Docker

* Data: JSON, CSV for test inputs

9. Functional Scope (UI)

   | Functionality                              | UI Element            | Priority         | Test Type            |
   |--------------------------------------------|-----------------------|------------------|----------------------|
   | Registration (merchant/customer)            | Registration form      | High              | E2E, Regression       |
   | Auto creation of cart & profile on signup    | Registration flow      | High              | E2E, Regression       |
   | Login authentication                        | Login form             | High (Smoke)       | E2E, Regression       |
   | Authorization with access token             | Protected pages        | High              | E2E, Regression       |
   | Display random & cheapest products on home   | Home page              | Medium            | E2E, Regression       |
   | Display items & subcategories in category    | Category page          | Medium            | E2E, Regression       |
   | Display item details                         | Product details page    | Medium            | E2E, Regression       |
   | Add item to personal cart                    | Cart page              | High (Smoke)       | E2E, Regression       |
   | Access to cart only for authorized users     | Cart page              | High              | E2E, Regression       |


10. Schedule

Design: -

Implementation: -

Execution: Per build in CI/CD pipeline

11. Risks

* Flaky tests in CI/CD environments

* UI synchronization issues with dynamic elements

* Dependency on backend stability

12. Reporting

* Allure/JUnit reports in CI/CD

* Defects tracked in GitHub Issues

* Screenshots and Selenium logs for failed tests

13. Team

QA Automation Engineer: emge1

Dev: emge1

DevOps: emge1