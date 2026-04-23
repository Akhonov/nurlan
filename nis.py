class Course:
    def __init__(self, title, instructor, price, is_published=True):
        self.title = title
        self.instructor = instructor
        self.price = price
        self.is_published = is_published

    def show_preview(self):
        status = "Published" if self.is_published else "Not published"
        print(
            "Course:",
            self.title,
            "| Instructor:",
            self.instructor,
            "| Price: $",
            self.price,
            "| Status:",
            status,
        )


class UserAccount:
    def __init__(self, username, email):
        self.username = username
        self.email = email

    def get_access_level(self):
        return "Basic user access"


class Admin(UserAccount):
    def delete_comments(self):
        return f"{self.username} can delete comments."

    def get_access_level(self):
        return "Admin access"


class Student(UserAccount):
    def dashboard_view(self):
        return f"{self.username}'s dashboard: enrolled courses and progress."


class Instructor(UserAccount):
    def dashboard_view(self):
        return f"{self.username}'s dashboard: created courses and student analytics."


course1 = Course("Python Basics", "Nurlan", 49.99)
course2 = Course("Web Development", "Aigerim", 79.99, False)

course1.show_preview()
course2.show_preview()

user = UserAccount("student01", "student01@example.com")
admin = Admin("admin01", "admin01@example.com")

print(user.get_access_level())
print(admin.get_access_level())
print(admin.delete_comments())

student = Student("aliya", "aliya@example.com")
instructor = Instructor("teacher01", "teacher01@example.com")

print(student.dashboard_view())
print(instructor.dashboard_view())
