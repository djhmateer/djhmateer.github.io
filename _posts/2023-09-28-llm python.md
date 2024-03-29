---
layout: post
#title: 
description: 
menu: review
categories: ai 
published: true 
comments: false     
sitemap: true
image: /assets/2023-07-22/1.jpg
---

<!-- [![alt text](/assets/2023-07-22/1.jpg "email"){:width="800px"}](/assets/2023-07-22/1.jpg) -->
<!-- [![alt text](/assets/2023-08-01/1.jpg "email")](/assets/2023-08-01/1.jpg) -->

<!-- [![alt text](/assets/2023-08-23/3.jpg "email")](/assets/2023-08-23/3.jpg) -->

I'm exploring LLM's and also teaching at a coding club. Can LLM's help?


[https://www.youtube.com/watch?v=jRAAaDll34Q](https://www.youtube.com/watch?v=jRAAaDll34Q) Using ChatGPT as a Powerful Tool for Programming

## Loop

> please write a python script that loops from 1 to 10 and prints out each number

```py
for number in range(1, 11):
    print(number)

```

## Password SALT

> Write a Python script that accepts user input. This input will be a password. I then want this password to be hasehd using a salt. Then print the hased password to the user.


> Since the user input is a password, can you make it so that when they type in their input it doesn't show the character they're typing t the screen?

uses getpass to hide screen

## Optimise existing code

type the code in and it will explain how it works.

```py
names = ['Corey', 'Chris', 'Travis', 'Dave']

index = 0
for name in names:
    print(index,name)
    index += 1
```

> optimise this code

```py
names = ['Corey', 'Chris', 'Travis', 'Dave']

for index, name in enumerate(names):
    print(index, name)
```


## Explain code - eg a Regex

[https://cs.lmu.edu/~ray/notes/regex/](https://cs.lmu.edu/~ray/notes/regex/) - some sample regex's

> can you explain what this regular expression does? [2-9]|[12]\d|3[0-6]


Or email address regex [which is complex](https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression)

> please exaplain this regular expression to check email addresses: (?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])

"In summary, this regular expression is quite comprehensive and can validate a wide range of email addresses, including those with special characters, quoted local parts, domain names, and IP addresses. However, please note that email address validation can be quite complex, and this regex may not cover all edge cases or conform to the latest email address standards. It's essential to consider the specific requirements of your application when using this regex for email validation."

ChatGPT4 tells you to send a confirmation email instead of trying to validate it.


> can you write a Python script using that regular expression to match email addresses in a string of text?

```py
import re

def match_email_addresses(text):
  """Matches email addresses in a string of text.

  Args:
    text: A string of text.

  Returns:
    A list of email addresses found in the text.
  """

  email_regex = re.compile(r'(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])')

  email_addresses = email_regex.findall(text)

  return email_addresses

# Example usage:

text = "This is a string of text that contains email addresses: john.doe@example.com, jane.doe@example.com, and bob.smith@example.com."

email_addresses = match_email_addresses(text)

print(email_addresses)
```

### Convert to Javascript

> can you convert this script to javascript


Please note that the JavaScript regular expression is slightly different from the Python regular expression, because JavaScript regular expressions are case-insensitive by default. To make the JavaScript regular expression case-insensitive, we have added the i flag to the end of the expression.

wow!

## Unit Tests

> can you write a Python script using that regular expression to match email addresses in a string of text?

```py
import re

# Define the regular expression pattern for matching email addresses
email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'

# Sample text containing email addresses
text = """
Here are some email addresses:
john.doe@example.com
jane.smith123@gmail.com
user@my-website.net
"""

# Find all email addresses in the text using the regular expression
matches = re.findall(email_pattern, text)

# Print the matched email addresses
for match in matches:
    print(match)

```


> write unit tests for this code

```py
import unittest
import re

def find_email_addresses(text):
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    return re.findall(email_pattern, text)

class TestEmailMatching(unittest.TestCase):

    def test_single_email(self):
        text = "Email address: john.doe@example.com"
        expected_result = ["john.doe@example.com"]
        self.assertEqual(find_email_addresses(text), expected_result)

    def test_multiple_emails(self):
        text = """
        Here are some email addresses:
        john.doe@example.com
        jane.smith123@gmail.com
        user@my-website.net
        """
        expected_result = ["john.doe@example.com", "jane.smith123@gmail.com", "user@my-website.net"]
        self.assertEqual(find_email_addresses(text), expected_result)

    def test_no_email(self):
        text = "This text does not contain any email addresses."
        expected_result = []
        self.assertEqual(find_email_addresses(text), expected_result)

if __name__ == '__main__':
    unittest.main()

```

> can you provide more tests with more edge cases


```py
import unittest
import re

def find_email_addresses(text):
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    return re.findall(email_pattern, text)

class TestEmailMatching(unittest.TestCase):

    def test_single_email(self):
        text = "Email address: john.doe@example.com"
        expected_result = ["john.doe@example.com"]
        self.assertEqual(find_email_addresses(text), expected_result)

    def test_multiple_emails(self):
        text = """
        Here are some email addresses:
        john.doe@example.com
        jane.smith123@gmail.com
        user@my-website.net
        """
        expected_result = ["john.doe@example.com", "jane.smith123@gmail.com", "user@my-website.net"]
        self.assertEqual(find_email_addresses(text), expected_result)

    def test_no_email(self):
        text = "This text does not contain any email addresses."
        expected_result = []
        self.assertEqual(find_email_addresses(text), expected_result)

    def test_email_with_underscores(self):
        text = "Email address: john_doe@example.com"
        expected_result = ["john_doe@example.com"]
        self.assertEqual(find_email_addresses(text), expected_result)

    def test_email_with_plus(self):
        text = "Email address: user+test@example.com"
        expected_result = ["user+test@example.com"]
        self.assertEqual(find_email_addresses(text), expected_result)

    def test_email_with_subdomains(self):
        text = "Email address: user@sub.example.co.uk"
        expected_result = ["user@sub.example.co.uk"]
        self.assertEqual(find_email_addresses(text), expected_result)

    def test_email_with_invalid_domain(self):
        text = "Invalid email address: user@.com"
        expected_result = []
        self.assertEqual(find_email_addresses(text), expected_result)

    def test_email_with_numbers_in_domain_tld(self):
        text = "Email address: user@example123.net"
        expected_result = ["user@example123.net"]
        self.assertEqual(find_email_addresses(text), expected_result)

if __name__ == '__main__':
    unittest.main()
```

wow!

> more

and it does

### Documentation

> can you add comments and documentation for that code?


```py
import unittest
import re

def find_email_addresses(text):
    """
    Find and return a list of email addresses in a given text.

    Args:
        text (str): The input text to search for email addresses in.

    Returns:
        list: A list of matched email addresses found in the input text.
    """
    # Define the regular expression pattern for matching email addresses
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    
    # Use re.findall to find all matches of the email pattern in the text
    return re.findall(email_pattern, text)

class TestEmailMatching(unittest.TestCase):
    """
    Unit tests for the email address matching code.
    """

    def test_single_email(self):
        """
        Test matching a single email address in the text.
        """
        text = "Email address: john.doe@example.com"
        expected_result = ["john.doe@example.com"]
        self.assertEqual(find_email_addresses(text), expected_result)

    def test_multiple_emails(self):
        """
        Test matching multiple email addresses in the text.
        """
        text = """
        Here are some email addresses:
        john.doe@example.com
        jane.smith123@gmail.com
        user@my-website.net
        """
        expected_result = ["john.doe@example.com", "jane.smith123@gmail.com", "user@my-website.net"]
        self.assertEqual(find_email_addresses(text), expected_result)

    def test_no_email(self):
        """
        Test when there are no email addresses in the text.
        """
        text = "This text does not contain any email addresses."
        expected_result = []
        self.assertEqual(find_email_addresses(text), expected_result)

    # Add more test cases here with comments explaining their purpose

if __name__ == '__main__':
    unittest.main()

```

## Starting a project - **GREAT USE CASE**

eg we have a project idea

want to check out league of legends API

but can start easier with chat gpt

> Can you write a Python script using the League of Legends API that shows me the percentage of wins for a specific player?

```py
import requests

# Replace 'YOUR_API_KEY' with your actual API key
API_KEY = 'YOUR_API_KEY'

# Define the region and summoner name you want to look up
REGION = 'na1'  # Change to the appropriate region code
SUMMONER_NAME = 'SummonerName'  # Replace with the summoner's name you want to search

# Define the base API URL
BASE_URL = f'https://{REGION}.api.riotgames.com/lol'

# Function to get summoner information
def get_summoner_data():
    try:
        # Get summoner ID
        summoner_url = f'{BASE_URL}/summoner/v4/summoners/by-name/{SUMMONER_NAME}'
        response = requests.get(summoner_url, headers={'X-Riot-Token': API_KEY})

        if response.status_code == 200:
            summoner_data = response.json()
            summoner_id = summoner_data['id']
            return summoner_id
        else:
            print(f'Error: Unable to retrieve summoner data. Status code: {response.status_code}')
            return None

    except Exception as e:
        print(f'An error occurred: {str(e)}')
        return None

# Function to get ranked statistics for a summoner
def get_ranked_stats(summoner_id):
    try:
        # Get ranked data
        ranked_url = f'{BASE_URL}/league/v4/entries/by-summoner/{summoner_id}'
        response = requests.get(ranked_url, headers={'X-Riot-Token': API_KEY})

        if response.status_code == 200:
            ranked_data = response.json()
            return ranked_data
        else:
            print(f'Error: Unable to retrieve ranked data. Status code: {response.status_code}')
            return None

    except Exception as e:
        print(f'An error occurred: {str(e)}')
        return None

# Function to calculate win percentage
def calculate_win_percentage(ranked_data):
    total_games = 0
    wins = 0

    for entry in ranked_data:
        if entry['queueType'] == 'RANKED_SOLO_5x5':
            total_games += entry['wins'] + entry['losses']
            wins += entry['wins']

    if total_games > 0:
        win_percentage = (wins / total_games) * 100
        return win_percentage
    else:
        return 0

# Main function
def main():
    summoner_id = get_summoner_data()
    if summoner_id:
        ranked_data = get_ranked_stats(summoner_id)
        if ranked_data:
            win_percentage = calculate_win_percentage(ranked_data)
            print(f'Win Percentage for {SUMMONER_NAME}: {win_percentage:.2f}%')

if __name__ == "__main__":
    main()

```

wow!! this is a great start.


## Learning

> Whats the best resource for learning Python on YouTube?

- corey schafer 
- sentdex
- tech with tim
- coding with harry





## Capital City Game

> make a game in python where  it gives you the name of a country in Europe, and you are give 4 capital cities to choose from. you can then enter a guess and the program tells you if you 're right. for example it may say: France, and give 4 cities as a multiple choice: London, Paris, Rome and Berlin

By describing in English up front what we want, it is a great way to think about programmming.

###  GPT-3.5

```py
import random

# Dictionary mapping European countries to their capital cities
european_countries = {
    "France": "Paris",
    "Germany": "Berlin",
    "Italy": "Rome",
    "United Kingdom": "London",
    # Add more countries and capitals as needed
}

def choose_random_country():
    # Select a random country from the dictionary
    country = random.choice(list(european_countries.keys()))
    return country

def generate_options(correct_option):
    # Generate a list of 4 options, including the correct one
    options = [correct_option]

    # Add three random capital cities as incorrect options
    while len(options) < 4:
        random_option = random.choice(list(european_countries.values()))
        if random_option not in options:
            options.append(random_option)

    # Shuffle the options to mix up the order
    random.shuffle(options)
    return options

def main():
    print("Welcome to the European Capital Quiz!")
    
    while True:
        # Choose a random country and its correct capital
        country = choose_random_country()
        correct_capital = european_countries[country]

        # Generate multiple-choice options
        options = generate_options(correct_capital)

        print(f"What is the capital city of {country}?")
        for i, option in enumerate(options):
            print(f"{i+1}. {option}")

        try:
            # Get user's guess
            user_guess = int(input("Enter the number of your guess (1-4): "))
            
            if 1 <= user_guess <= 4:
                user_guess = options[user_guess - 1]

                # Check if the guess is correct
                if user_guess == correct_capital:
                    print("Correct! Well done!")
                else:
                    print(f"Sorry, that's incorrect. The correct answer is {correct_capital}.")
            else:
                print("Please enter a valid number (1-4).")
            
            play_again = input("Play again? (yes/no): ").strip().lower()
            if play_again != 'yes':
                break
        except ValueError:
            print("Please enter a valid number (1-4).")

if __name__ == "__main__":
    main()
```

Well this is brilliant as it gives a good start!

>  Put in all the counties and capitals please

```py
european_countries = {
    "Albania": "Tirana",
    "Andorra": "Andorra la Vella",
    "Austria": "Vienna",
    "Belarus": "Minsk",
    "Belgium": "Brussels",
    "Bosnia and Herzegovina": "Sarajevo",
    "Bulgaria": "Sofia",
    "Croatia": "Zagreb",
    "Cyprus": "Nicosia",
    "Czech Republic": "Prague",
    "Denmark": "Copenhagen",
    "Estonia": "Tallinn",
    "Finland": "Helsinki",
    "France": "Paris",
    "Germany": "Berlin",
    "Greece": "Athens",
    "Hungary": "Budapest",
    "Iceland": "Reykjavik",
    "Ireland": "Dublin",
    "Italy": "Rome",
    "Latvia": "Riga",
    "Liechtenstein": "Vaduz",
    "Lithuania": "Vilnius",
    "Luxembourg": "Luxembourg City",
    "Malta": "Valletta",
    "Moldova": "Chisinau",
    "Monaco": "Monaco",
    "Montenegro": "Podgorica",
    "Netherlands": "Amsterdam",
    "North Macedonia": "Skopje",
    "Norway": "Oslo",
    "Poland": "Warsaw",
    "Portugal": "Lisbon",
    "Romania": "Bucharest",
    "Russia": "Moscow",
    "San Marino": "San Marino",
    "Serbia": "Belgrade",
    "Slovakia": "Bratislava",
    "Slovenia": "Ljubljana",
    "Spain": "Madrid",
    "Sweden": "Stockholm",
    "Switzerland": "Bern",
    "Ukraine": "Kyiv",
    "United Kingdom": "London",
    "Vatican City": "Vatican City",
}
```

Notice that we need to check facts eg UK: London. I'd split that into the 4 separate countries.

> Can you make a high score counter?


### Bard

Bard produces 3 differnt drafts of the answer. Here is #1 (simple versin). 

```py
import random

# create a dictionary of European countries and their capitals
countries = {
    "France": "Paris",
    "Germany": "Berlin",
    "Italy": "Rome",
    "Spain": "Madrid",
    "United Kingdom": "London",
    "Poland": "Warsaw",
    "Ukraine": "Kyiv",
    "Romania": "Bucharest",
    "Netherlands": "Amsterdam",
    "Belgium": "Brussels",
    "Czech Republic": "Prague",
    "Greece": "Athens"
}

# get a random country from the dictionary
country = random.choice(list(countries.keys()))

# get the capital of the selected country
capital = countries[country]

# generate 3 random wrong answers
wrong_answers = []
for i in range(3):
    wrong_answer = random.choice(list(countries.values()))
    while wrong_answer == capital or wrong_answer in wrong_answers:
        wrong_answer = random.choice(list(countries.values()))
    wrong_answers.append(wrong_answer)

# shuffle the answers
answers = [capital] + wrong_answers
random.shuffle(answers)

# print the question and answers
print("What is the capital of {}?".format(country))
for i in range(4):
    print("{}. {}".format(i + 1, answers[i]))

# get the user's guess
guess = int(input("Enter your guess: "))

# check the user's guess
if guess == 1 and answers[0] == capital:
    print("Correct!")
elif guess == 2 and answers[1] == capital:
    print("Correct!")
elif guess == 3 and answers[2] == capital:
    print("Correct!")
elif guess == 4 and answers[3] == capital:
    print("Correct!")
else:
    print("Incorrect. The correct answer is {}".format(capital))

```

#2 includes some of suggestions it made for #1!!! wow this is super. This one includesa high score counter:

```py
import random

def generate_question():
  """Generates a question for the game.

  Returns:
    A tuple of (country, capital, options), where country is the name of the
    European country, capital is the correct answer, and options is a list of
    four possible answers, including the correct answer.
  """

  countries = ["France", "Germany", "Italy", "Spain", "United Kingdom"]
  capitals = ["Paris", "Berlin", "Rome", "Madrid", "London"]

  country = random.choice(countries)
  capital = capitals[countries.index(country)]
  options = random.sample(capitals, 4)
  options[options.index(capital)] = capital

  return country, capital, options

def main():
  """Plays the game."""

  score = 0

  while True:
    country, capital, options = generate_question()

    print(f"What is the capital of {country}?")
    print("Options:", options)

    guess = input("Your guess: ")

    if guess == capital:
      print("Correct!")
      score += 1
    else:
      print("Incorrect. The correct answer is", capital)

    print(f"Your score is {score}")

    play_again = input("Play again? (y/n) ")
    if play_again != "y":
      break

  print(f"Thanks for playing! Your final score is {score}")

if __name__ == "__main__":
  main()

```
This one you have to type the answer eg London ... nice

#3 is actually broken and doesn't produce the correct results!!!

```py
import random

# Create a dictionary of European countries and their capitals
countries_and_capitals = {
    "Austria": "Vienna",
    "Belgium": "Brussels",
    "Bulgaria": "Sofia",
    "Croatia": "Zagreb",
    "Cyprus": "Nicosia",
    "Czech Republic": "Prague",
    "Denmark": "Copenhagen",
    "Estonia": "Tallinn",
    "Finland": "Helsinki",
    "France": "Paris",
    "Germany": "Berlin",
    "Greece": "Athens",
    "Hungary": "Budapest",
    "Iceland": "Reykjavík",
    "Ireland": "Dublin",
    "Italy": "Rome",
    "Latvia": "Riga",
    "Liechtenstein": "Vaduz",
    "Lithuania": "Vilnius",
    "Luxembourg": "Luxembourg City",
    "Malta": "Valletta",
    "Monaco": "Monaco",
    "Montenegro": "Podgorica",
    "Netherlands": "Amsterdam",
    "North Macedonia": "Skopje",
    "Norway": "Oslo",
    "Poland": "Warsaw",
    "Portugal": "Lisbon",
    "Romania": "Bucharest",
    "San Marino": "City of San Marino",
    "Serbia": "Belgrade",
    "Slovakia": "Bratislava",
    "Slovenia": "Ljubljana",
    "Spain": "Madrid",
    "Sweden": "Stockholm",
    "Switzerland": "Bern",
    "Ukraine": "Kyiv",
    "United Kingdom": "London"
}

# Start the game
while True:

    # Choose a random country
    country = random.choice(list(countries_and_capitals.keys()))

    # Get the capital city of the chosen country
    capital = countries_and_capitals[country]

    # Generate four random capital cities
    answer_choices = random.sample(list(countries_and_capitals.values()), 3)

    # Add the correct answer to the answer choices
    answer_choices.append(capital)

    # Shuffle the answer choices
    random.shuffle(answer_choices)

    # Print the question and answer choices
    print(f"What is the capital of {country}?")
    print("Answer choices:")
    for i in range(4):
        print(f"{i + 1}: {answer_choices[i]}")

    # Get the user's guess
    guess = int(input("Your guess: "))

    # Check if the user's guess is correct
    if guess == 4:
        print("Correct! The capital of {} is {}".format(country, capital))
    else:
        print("Incorrect. The correct answer is {}".format(capital))

    # Ask the user if they want to play again
    play_again = input("Play again? (y/n): ")
    if play_again != "y":
        break
```

## Not press Enter

> when it says Play again? can I not have to press enter when I press y

```py
import random
import msvcrt

def generate_question():
  """Generates a question for the game.

  Returns:
    A tuple of (country, capital, options), where country is the name of the
    European country, capital is the correct answer, and options is a list of
    four possible answers, including the correct answer.
  """

  countries = ["France", "Germany", "Italy", "Spain", "United Kingdom"]
  capitals = ["Paris", "Berlin", "Rome", "Madrid", "London"]

  country = random.choice(countries)
  capital = capitals[countries.index(country)]
  options = random.sample(capitals, 4)
  options[options.index(capital)] = capital

  return country, capital, options

def main():
  """Plays the game."""

  score = 0

  while True:
    country, capital, options = generate_question()

    print(f"What is the capital of {country}?")
    print("Options:", options)

    guess = msvcrt.getch().decode("utf-8")

    if guess == capital:
      print("Correct!")
      score += 1
    else:
      print("Incorrect. The correct answer is", capital)

    print(f"Your score is {score}")

    play_again = msvcrt.getch().decode("utf-8")
    if play_again != "y":
      break

  print(f"Thanks for playing! Your final score is {score}")

if __name__ == "__main__":
  main()


```

> How do I install msvcrt? 
