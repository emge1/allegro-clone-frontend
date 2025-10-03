import pytest
from tests.pages.homepage import HomePage
from selenium.webdriver.common.by import By


@pytest.mark.ui
def test_get_random_products(browser):
    page = HomePage(browser)
    page.open()
    products = page.get_random_products()

    assert len(products) == 5

    for product in products:
        name = product.find_element(By.TAG_NAME, "h3").text
        price = product.find_element(By.TAG_NAME, "p").text

        assert name != ""
        assert "PLN" in price


@pytest.mark.ui
def test_get_cheapest_products(browser):
    page = HomePage(browser)
    page.open()
    products = page.get_cheapest_products()

    for product in products:
        price = product.find_element(By.TAG_NAME, "p").text.split()

        assert float(price[0]) < 50
