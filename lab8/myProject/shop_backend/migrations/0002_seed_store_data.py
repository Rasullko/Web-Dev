import json
from pathlib import Path

from django.db import migrations


def seed_store_data(apps, schema_editor):
    category_model = apps.get_model('shop_backend', 'Category')
    product_model = apps.get_model('shop_backend', 'Product')

    public_dir = Path(__file__).resolve().parents[2] / 'online-store' / 'public'
    categories_path = public_dir / 'categories.json'
    products_path = public_dir / 'products.json'

    if not categories_path.exists() or not products_path.exists():
        return

    with categories_path.open(encoding='utf-8') as categories_file:
        categories = json.load(categories_file)

    with products_path.open(encoding='utf-8') as products_file:
        products = json.load(products_file)

    created_categories = {}
    for item in categories:
        category, _ = category_model.objects.get_or_create(
            id=item['id'],
            defaults={'name': item['name']},
        )
        created_categories[category.id] = category

    for item in products:
        category = created_categories.get(item['categoryId'])
        if category is None:
            continue

        product_model.objects.get_or_create(
            id=item['id'],
            defaults={
                'name': item['name'],
                'description': item['description'],
                'price': item['price'],
                'rating': item['rating'],
                'images': item['images'],
                'link': item['link'],
                'likes': item.get('likes', 0),
                'category': category,
            },
        )


def unseed_store_data(apps, schema_editor):
    apps.get_model('shop_backend', 'Product').objects.all().delete()
    apps.get_model('shop_backend', 'Category').objects.all().delete()


class Migration(migrations.Migration):
    dependencies = [
        ('shop_backend', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed_store_data, unseed_store_data),
    ]
