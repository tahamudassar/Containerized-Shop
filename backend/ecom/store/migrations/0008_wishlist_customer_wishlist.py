# Generated by Django 5.1.5 on 2025-01-30 10:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0007_product_discount_price'),
    ]

    operations = [
        migrations.CreateModel(
            name='Wishlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='wishlists', to='store.customer')),
                ('products', models.ManyToManyField(related_name='wishlists', to='store.product')),
            ],
        ),
        migrations.AddField(
            model_name='customer',
            name='wishlist',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='customers', to='store.wishlist'),
        ),
    ]
