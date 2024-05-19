import hashlib
import os

password = 'qwerty'
salt = os.urandom(32)

hashed_password = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 10000)

print(salt)
print(hashed_password)
