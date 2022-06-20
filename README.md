# Install
- run the following command
```console
$ npm install
```

# Create Mock Data
- run the following command
```console
$ npm run mock
```
- it will create test.sqlite file.

### Database for Donators (Sqlite3)
id   | full_name        |     ssn      | preferred_channel | expected_donation |
:--: | :---:            | :---:        | :---:             | :---:             |
1    | Jacob Smith      | 123123123    | email             | 700               |
2    | Emma Williams    | 111111111    | email             | 200               |
3    | Emily Brown      | 2223232323   | LinkedIn          | 400               |
4    | Michael Jones    | 43215151646  | Instagram         | 150               |
5    | Alexander Miller | 54353542345  | Instagram         | 650               |


# Run 
- run the code
```console
$ npm run start
```
- result
```console
Best Schedule ---------------------------------
Total danation:  1350
Donators:
full_name: Jacob Smith, ssn: 123123123, preferred_channel: email, expected_donation: 700
full_name: Alexander Miller, ssn: 54353542345, preferred_channel: Instagram, expected_donation: 650
```
