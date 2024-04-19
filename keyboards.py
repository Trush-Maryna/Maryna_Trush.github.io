from aiogram.types import WebAppInfo
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, ReplyKeyboardMarkup, KeyboardButton
from aiogram.utils.callback_data import CallbackData

from config import ANTIBIOTIKI_URL

cb = CallbackData('btn', 'action')
key = InlineKeyboardMarkup(
    inline_keyboard=[[InlineKeyboardButton('Pay', callback_data='btn:buy')]]
)

start_keyboard = InlineKeyboardMarkup(inline_keyboard=[
    [InlineKeyboardButton(text="🛒 Оформити замовлення", callback_data='order')]
])

categories_keyboard = InlineKeyboardMarkup(inline_keyboard=[
    [InlineKeyboardButton(text="👩🏻‍⚕️ Ліки", callback_data='medicines')]
])

medicines_keyboard = InlineKeyboardMarkup(inline_keyboard=[
    [InlineKeyboardButton(text="• Антибіотики та протимікробні препарати", callback_data='antibiotics')]
])

antibiotiki_app = WebAppInfo(url=ANTIBIOTIKI_URL)

antibiotiki_app_button = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text="Асортимент товарів", web_app=antibiotiki_app)]
    ],
    resize_keyboard=True
)

check_receipt_keyboard = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text="Отримати чек")]
    ],
    resize_keyboard=True
)
