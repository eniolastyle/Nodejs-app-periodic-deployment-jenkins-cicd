def get_user_input():
    print("Welcome to the User Information Form")
    username = input("Username: ")
    name = input("Name: ")
    age = input("Age: ")
    email = input("Email: ")
    state_of_origin = input("State of Origin: ")
    user_class = input("Class: ")
    education = input("Education: ")

    return {
        "Username": username,
        "Name": name,
        "Age": age,
        "Email": email,
        "State of Origin": state_of_origin,
        "Class": user_class,
        "Education": education
    }

def display_user_info(user_info):
    print("\nUser Information Summary:")
    for key, value in user_info.items():
        print(f"{key}: {value}")

if __name__ == "__main__":
    user_info = get_user_input()
    display_user_info(user_info)
