from django.contrib import admin
from .models import User
from .models import StudyPost, BloodDonationPost, CarpoolPost,Community, Material
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("email", "username", "role", "profile_image")
    list_filter = ("role",)
    search_fields = ("email", "username")

admin.site.register(StudyPost)
admin.site.register(BloodDonationPost)
admin.site.register(CarpoolPost)
admin.site.register(Community)
admin.site.register(Material)