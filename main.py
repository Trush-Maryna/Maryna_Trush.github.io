import json
from aiogram import Bot, Dispatcher
from aiogram.types import CallbackQuery, Message, PreCheckoutQuery, ContentType
from aiogram.contrib.middlewares.logging import LoggingMiddleware
from aiogram.utils import executor

from keyboards import start_keyboard, categories_keyboard, medicines_keyboard, antibiotiki_app_button
from config import BOT_TOKEN, PAYMENTS_TOKEN, CHANNEL_ID

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher(bot)
dp.middleware.setup(LoggingMiddleware())

@dp.message_handler(commands=['start'])
async def start(message: Message):
    await message.answer("Давайте розпочнемо 🥳\n\nСкористайтеся меню для перегляду асортименту товарів або натисніть кнопку нижче щоб замовити:",
                         reply_markup=start_keyboard)

@dp.callback_query_handler(lambda c: c.data == 'order')
async def process_order(callback_query: CallbackQuery):
    await bot.answer_callback_query(callback_query.id)
    await bot.send_message(callback_query.from_user.id, "Оберіть категорію товарів:", reply_markup=categories_keyboard)

@dp.callback_query_handler(lambda c: c.data == 'medicines')
async def process_medicines(callback_query: CallbackQuery):
    await bot.answer_callback_query(callback_query.id)
    await bot.send_message(callback_query.from_user.id, "Оберіть категорію ліків:", reply_markup=medicines_keyboard)

@dp.callback_query_handler(lambda c: c.data == 'vitamins')
async def process_vitamins(callback_query: CallbackQuery):
    await bot.answer_callback_query(callback_query.id)
    await bot.send_message(callback_query.from_user.id, "Оберіть категорію ліків:", reply_markup=medicines_keyboard)

@dp.callback_query_handler(lambda c: c.data == 'beauty')
async def process_beauty(callback_query: CallbackQuery):
    await bot.answer_callback_query(callback_query.id)
    await bot.send_message(callback_query.from_user.id, "Оберіть категорію ліків:", reply_markup=medicines_keyboard)

@dp.callback_query_handler(lambda c: c.data == 'children')
async def process_children(callback_query: CallbackQuery):
    await bot.answer_callback_query(callback_query.id)
    await bot.send_message(callback_query.from_user.id, "Оберіть категорію ліків:", reply_markup=medicines_keyboard)

@dp.callback_query_handler(lambda c: c.data == 'sport')
async def process_sport(callback_query: CallbackQuery):
    await bot.answer_callback_query(callback_query.id)
    await bot.send_message(callback_query.from_user.id, "Оберіть категорію ліків:", reply_markup=medicines_keyboard)

@dp.callback_query_handler(lambda c: c.data == 'medical_equipment')
async def process_medical_equipment(callback_query: CallbackQuery):
    await bot.answer_callback_query(callback_query.id)
    await bot.send_message(callback_query.from_user.id, "Оберіть категорію ліків:", reply_markup=medicines_keyboard)

@dp.callback_query_handler(lambda c: c.data == 'miscellaneous')
async def process_miscellaneous(callback_query: CallbackQuery):
    await bot.answer_callback_query(callback_query.id)
    await bot.send_message(callback_query.from_user.id, "Оберіть категорію ліків:", reply_markup=medicines_keyboard)

@dp.callback_query_handler(lambda c: c.data == 'antibiotics')
async def process_antibiotics(callback_query: CallbackQuery):
    await bot.answer_callback_query(callback_query.id)
    await bot.send_message(callback_query.from_user.id, "⬇️", reply_markup=antibiotiki_app_button)

@dp.callback_query_handler(lambda c: c.data == 'cold_medicines')
async def process_cold_medicines(callback_query: CallbackQuery):
    await bot.answer_callback_query(callback_query.id)
    await bot.send_message(callback_query.from_user.id, "⬇️", reply_markup=antibiotiki_app_button)

@dp.callback_query_handler(lambda c: c.data == 'pain_relief')
async def process_pain_relief(callback_query: CallbackQuery):
    await bot.answer_callback_query(callback_query.id)
    await bot.send_message(callback_query.from_user.id, "⬇️", reply_markup=antibiotiki_app_button)

@dp.callback_query_handler(lambda c: c.data == 'stomach_medicines')
async def process_stomach_medicines(callback_query: CallbackQuery):
    await bot.answer_callback_query(callback_query.id)
    await bot.send_message(callback_query.from_user.id, "⬇️", reply_markup=antibiotiki_app_button)

@dp.callback_query_handler(lambda c: c.data == 'allergy_medicines')
async def process_allergy_medicines(callback_query: CallbackQuery):
    await bot.answer_callback_query(callback_query.id)
    await bot.send_message(callback_query.from_user.id, "⬇️", reply_markup=antibiotiki_app_button)

@dp.callback_query_handler(lambda c: c.data == 'heart_medicines')
async def process_heart_medicines(callback_query: CallbackQuery):
    await bot.answer_callback_query(callback_query.id)
    await bot.send_message(callback_query.from_user.id, "⬇️", reply_markup=antibiotiki_app_button)

@dp.message_handler(content_types=ContentType.WEB_APP_DATA)
async def process_web_app_data(message: Message):
    data = json.loads(message.web_app_data.data)
    if data['type'] == 'order_info':
        order_details = data['data']
        total_price = data['totalPrice']
        customer_info = data['customerInfo']

        response_message = f"Дякуємо {customer_info['fullName']}! \nЗамовлення прийнято\nОсь ваш чек:\n"
        for item in order_details:
            response_message += f"{item['name']}, кількість: {item['quantity']}, ціна: {item['totalPrice']} грн.\n"
        response_message += f"Загальна ціна: {total_price} грн.\n"
        response_message += f"Деталі доставки:\n"
        response_message += f"Номер телефону: {customer_info['phoneNumber']}\n"
        response_message += f"Область: {customer_info['region']}\n"
        response_message += f"Місто: {customer_info['city']}\n"
        response_message += f"Відділення НП: {customer_info['office']}\n"
        await message.answer(response_message)

        channel_id = CHANNEL_ID
        response_message = f"Нове замовлення від {customer_info['fullName']}!\n"
        for item in order_details:
            response_message += f"{item['name']}, кількість: {item['quantity']}, ціна: {item['totalPrice']} грн.\n"
        response_message += f"Загальна ціна: {total_price} грн.\n"
        response_message += f"Деталі доставки:\n"
        response_message += f"ПІБ: {customer_info['fullName']}\n"
        response_message += f"Номер телефону: {customer_info['phoneNumber']}\n"
        response_message += f"Область: {customer_info['region']}\n"
        response_message += f"Місто: {customer_info['city']}\n"
        response_message += f"Відділення НП: {customer_info['office']}\n"
        await bot.send_message(channel_id, response_message)


'''
@dp.message_handler(content_types=[web_app_data])
async def process_web_app_data(message: Message):
    if message.web_app_data == "send_order_info":
        order_data = json.loads(message.text)
        print("Order data :", order_data)
        await send_order_to_admin(order_data)
        await send_order_to_user(message.from_user.id, order_data)
    else:
        pass

async def send_order_to_admin(order_data):
    order_description = ""
    total_price = order_data['totalPrice']

    for item in order_data['data']:
        order_description += f"{item['name']}: {item['description']}, Кількість: {item['quantity']}\n"

    print("Order data received by admin:", order_description)
    print('Total price:', total_price)
    await bot.send_message(ADMIN_ID, order_description)
    await bot.send_message(ADMIN_ID, f'Загальна ціна: {total_price} грн')

async def send_order_to_user(user_id, order_data):
    order_description = ""
    total_price = order_data['totalPrice']

    for item in order_data['data']:
        order_description += f"{item['name']}: {item['description']}, Кількість: {item['quantity']}\n"
    print("Order data received by user:", order_description)
    print('Total price:', total_price)
    await bot.send_message(user_id, order_description)
    await bot.send_message(user_id, f'Загальна ціна: {total_price} грн')


@dp.message_handler(content_types=['web_app_data'])
async def buy_process(web_app_message: Message):
    total_price = web_app_message.web_app_data.totalPrice
    await bot.send_invoice(web_app_message.chat.id, title='Замовлення', description='Ваше замовлення включає:', provider_token=PAYMENTS_TOKEN,
                           currency='grn', need_email=True, need_phone_number=True, prices=total_price,
                           start_parameter='order', payload='some_invoice')

@dp.pre_checkout_query_handler(lambda q: True)
async def checkout_process(pre_checkout_query: PreCheckoutQuery):
    await bot.answer_pre_checkout_query(pre_checkout_query.id, ok=True)

@dp.message_handler(content_types=ContentType.SUCCESSFUL_PAYMENT)
async def successful_payment(message: Message):
    await bot.send_message(message.chat.id, 'Платіж успішний')
'''
if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)