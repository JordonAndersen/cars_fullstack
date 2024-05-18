import re
from datetime import date

class IntStrDateConverter:
    
    # Updated regex to include date format YYYY-MM-DD
    regex = '[0-9]+|[a-zA-Z]+|\d{4}-\d{2}-\d{2}'

    def to_python(self, value):
        # Check if the value is a digit, if true, return it as an integer
        if value.isdigit():
            return int(value)
        # Check if the value matches the date format
        elif re.match(r'\d{4}-\d{2}-\d{2}', value):
            year, month, day = map(int, value.split('-'))
            return date(year, month, day)
        # Return the value as a string if it doesn't match the above conditions
        else:
            return str(value)
        
    def to_url(self, value):
        # If the value is a date, format it to YYYY-MM-DD
        if isinstance(value, date):
            return value.strftime('%Y-%m-%d')
        # Otherwise, return the value as a string
        else:
            return str(value)
