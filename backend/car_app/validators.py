from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator, MaxValueValidator, MinValueValidator

validate_max_door_number = MaxValueValidator(5)
validate_min_door_number = MinValueValidator(1)
