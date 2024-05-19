import bcrypt


def main():
    password = b'na gorshke sidel korol'
    hashed_password = bcrypt.hashpw(password, bcrypt.gensalt(12))
    print(hashed_password)
    password = b'123'
    if bcrypt.checkpw(password, hashed_password):
        print('True')
    else:
        print('Dosent match')


if __name__ == "__main__":
    main()
