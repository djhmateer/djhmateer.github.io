---
layout: post
title: ai and llm 
description: 
# menu: review
categories: ai 
published: true 
comments: false     
sitemap: true
image: /assets/2023-07-22/1.jpg
---

<!-- [![alt text](/assets/2023-07-22/1.jpg "email"){:width="800px"}](/assets/2023-07-22/1.jpg) -->
<!-- [![alt text](/assets/2023-08-01/1.jpg "email")](/assets/2023-08-01/1.jpg) -->

<!-- [![alt text](/assets/2023-08-23/3.jpg "email")](/assets/2023-08-23/3.jpg) -->

An exploration into what LLM's are good at from a coding perspective.

Point 1 from my previous article:

1. Coding code completion / summerisation of code
2. assimilating information and summerising 
3. generation (text / image)
4. coversation (chatbots)
5. knowledge accessibility - question and answer 

### 1. CRUD app in Python 

"can you write a simple crud app in python?"

GPT3.5 did it well!

```py
import os

# Function to create a new task
def create_task(task_list, task):
    task_list.append(task)

# Function to read all tasks
def read_tasks(task_list):
    for index, task in enumerate(task_list):
        print(f"{index + 1}. {task}")

# Function to update a task
def update_task(task_list, index, new_task):
    if index >= 0 and index < len(task_list):
        task_list[index] = new_task
    else:
        print("Invalid task index")

# Function to delete a task
def delete_task(task_list, index):
    if index >= 0 and index < len(task_list):
        del task_list[index]
    else:
        print("Invalid task index")

# Function to save tasks to a text file
def save_tasks_to_file(task_list, filename):
    with open(filename, "w") as file:
        for task in task_list:
            file.write(task + "\n")

# Function to load tasks from a text file
def load_tasks_from_file(filename):
    task_list = []
    if os.path.exists(filename):
        with open(filename, "r") as file:
            task_list = file.read().splitlines()
    return task_list

# Main function
def main():
    filename = "tasks.txt"
    tasks = load_tasks_from_file(filename)

    while True:
        print("\nTask Management Menu:")
        print("1. Add Task")
        print("2. List Tasks")
        print("3. Update Task")
        print("4. Delete Task")
        print("5. Exit")

        choice = input("Enter your choice: ")

        if choice == "1":
            task = input("Enter a new task: ")
            create_task(tasks, task)
        elif choice == "2":
            read_tasks(tasks)
        elif choice == "3":
            index = int(input("Enter the task number to update: ")) - 1
            new_task = input("Enter the new task: ")
            update_task(tasks, index, new_task)
        elif choice == "4":
            index = int(input("Enter the task number to delete: ")) - 1
            delete_task(tasks, index)
        elif choice == "5":
            save_tasks_to_file(tasks, filename)
            print("Exiting the program.")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
```

This is great as it gives a starting point. Many others have observedd a productivity boost by leveregying this.


### 2. CRUD in Python

I asked GPT-3.5 to do the same again the next day and it gave a more OO approach:

```py
class SimpleCRUDApp:
    def __init__(self):
        self.items = []

    def create(self, item):
        self.items.append(item)
        print(f"Item '{item}' added successfully.")

    def read(self):
        if self.items:
            print("Items:")
            for index, item in enumerate(self.items, start=1):
                print(f"{index}. {item}")
        else:
            print("No items found.")

    def update(self, index, new_item):
        if 1 <= index <= len(self.items):
            self.items[index - 1] = new_item
            print(f"Item at index {index} updated successfully.")
        else:
            print("Invalid index. Item not updated.")

    def delete(self, index):
        if 1 <= index <= len(self.items):
            deleted_item = self.items.pop(index - 1)
            print(f"Item '{deleted_item}' deleted successfully.")
        else:
            print("Invalid index. Item not deleted.")

def main():
    crud_app = SimpleCRUDApp()

    while True:
        print("\nCRUD Operations:")
        print("1. Create")
        print("2. Read")
        print("3. Update")
        print("4. Delete")
        print("5. Exit")

        choice = input("Enter your choice (1/2/3/4/5): ")

        if choice == '1':
            item = input("Enter the item to create: ")
            crud_app.create(item)
        elif choice ==

```

tweaking:

- make simpler and remove class
- add in comments (wasn't that helpful)
- save to a file (which is did initlally)... but then gave me code to use pickle to serialize items (a good idea!)
- running/regenerating multiple times gave interesting ideas


## Real world example - log parser

So I've got logs which are a bit verbose eg

```
2023-09-20 19:44:09.710 | WARNING  | src.auto_archiver.enrichers.wacz_enricher:extract_media_from_wacz:229 - Total images is > 70 so stopping crawl
2023-09-20 19:47:08.960 | SUCCESS  | src.auto_archiver.databases.gsheet_db:done:51 - DONE https://www.facebook.com/wcsbf/posts/pfbid02AVQc7dCqw1fbpa9Zi9FmFjDz9b2VhMBfW7jhQPDizLN5wMyggcYUUZHqKYhj3MbZl
2023-09-20 19:47:10.160 | SUCCESS  | src.auto_archiver.databases.gsheet_db:done:141 - Inserted hash into db SHA3-512:bdb6d188a3499add88cbd7b79b9098afd13b8948e44eeeeae122188d69286c636412843273f99374784f2b82347861eeeec1b8ff45fe4edc4c69287e3bfe0971
2023-09-20 19:47:10.265 | SUCCESS  | src.auto_archiver.feeders.gsheet_feeder:__iter__:93 - Finished worksheet Sheet1
2023-09-20 19:48:05.087 | SUCCESS  | src.auto_archiver.feeders.gsheet_feeder:__iter__:93 - Finished worksheet Sheet1
2023-09-20 19:49:04.463 | SUCCESS  | src.auto_archiver.feeders.gsheet_feeder:__iter__:93 - Finished worksheet Sheet1
2023-09-20 19:50:05.432 | SUCCESS  | src.auto_archiver.feeders.gsheet_feeder:__iter__:93 - Finished worksheet Sheet1
2023-09-20 19:51:05.143 | SUCCESS  | src.auto_archiver.feeders.gsheet_feeder:__iter__:93 - Finished worksheet Sheet1
2023-09-20 19:52:04.494 | SUCCESS  | src.auto_archiver.feeders.gsheet_feeder:__iter__:93 - Finished worksheet Sheet1
2023-09-20 19:53:05.391 | SUCCESS  | src.auto_archiver.feeders.gsheet_feeder:__iter__:93 - Finished worksheet Sheet1
```

firstly I'd like to get rid of the finished worksheet messages

> in python create a logfile parser to load a file and get rid of lines that contain "SUCCESS  | src.auto_archiver.feeders.gsheet_feeder:__iter__:93 - Finished worksheet Sheet1" and write to a new file

> add comments

```py
# Define a function to filter a log file and create a new file without specific lines.
def filter_log_file(input_file, output_file, filter_string):
    try:
        # Open the input log file for reading and the output file for writing.
        with open(input_file, 'r') as infile, open(output_file, 'w') as outfile:
            # Iterate through each line in the input file.
            for line in infile:
                # Check if the filter string is NOT present in the line.
                if filter_string not in line:
                    # If the filter string is not found, write the line to the output file.
                    outfile.write(line)
        # Print a message indicating that the filtered log file has been saved.
        print(f"Filtered log file saved to {output_file}")
    except FileNotFoundError:
        # Handle the case where the input file is not found.
        print("File not found. Please provide a valid input file.")

if __name__ == "__main__":
    # Define the paths to the input and output files.
    input_file = "input.log"  # Replace with your input log file
    output_file = "filtered.log"  # Replace with the desired output file
    # Define the filter string you want to remove from the log file.
    filter_string = "SUCCESS  | src.auto_archiver.feeders.gsheet_feeder:__iter__:93 - Finished worksheet Sheet1"

    # Call the filter_log_file function with the specified parameters.
    filter_log_file(input_file, output_file, filter_string)
```

Well, this was very handy!


[Chat GPT-3.5]()
[Bing Chat - GPT-4.0](https://www.bing.com/)- use Edge browser
[Bard](https://bard.google.com/chat/) - gave a nice summary. Also used regex

