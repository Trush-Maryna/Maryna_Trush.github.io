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
    [InlineKeyboardButton(text="👩🏻‍⚕️ Ліки", callback_data='medicines')],
    [InlineKeyboardButton(text="💊 Вітаміни та мінерали", callback_data='vitamins')],
    [InlineKeyboardButton(text="💅 Краса та догляд", callback_data='beauty')],
    [InlineKeyboardButton(text="🤱🏻 Для дітей та мам", callback_data='children')],
    [InlineKeyboardButton(text="🏃🏻‍♀️ Спорт", callback_data='sport')],
    [InlineKeyboardButton(text="🩺 Медичне обладнання та вироби", callback_data='medical_equipment')],
    [InlineKeyboardButton(text="🤔 Різне", callback_data='miscellaneous')]
])

medicines_keyboard = InlineKeyboardMarkup(inline_keyboard=[
    [InlineKeyboardButton(text="• Антибіотики та протимікробні препарати", callback_data='antibiotics')],
    [InlineKeyboardButton(text="• Ліки від застуди", callback_data='cold_medicines')],
    [InlineKeyboardButton(text="• При болю і спазмах", callback_data='pain_relief')],
    [InlineKeyboardButton(text="• Ліки для шлунка, кишечника, печінки", callback_data='stomach_medicines')],
    [InlineKeyboardButton(text="• Ліки від алергії", callback_data='allergy_medicines')],
    [InlineKeyboardButton(text="• Ліки для серця і судин", callback_data='heart_medicines')]
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
