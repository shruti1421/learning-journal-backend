# API Reference

- [Register](#register)
- [Authenticate User](#authenticate-user)
- [Journals](#journals)
	- [Get All Journals of a User](#get-all-journals-of-a-user)
	- [Add a new Journal](#add-a-new-journal)
	- [Edit a Journal](#edit-a-journal)
	- [Delete a Journal](#delete-a-journal)
- [Share Journals](#share-journals)
	- [Display all journals shared with a user](#display-all-journals-shared-with-a-user)
	- [Share your journal with a friend](#share-your-journal-with-a-friend)
- [Bookmark your Favorite Journal](#bookmark-your-favorite-journal)
---------------------------


## Register
```http
  POST /api/users
```

| Request | Access    | Description                |
| :-------- | :------- | :------------------------- |
| `POST`| Public| Register a user|
## Authenticate User
```http
 POST  api/auth
```

| Request | Access    | Description                |
| :-------- | :------- | :------------------------- |
| `POST`| Public| Authenticate user and get token|
```http
  GET  api/auth
```

| Request | Access    | Description                |
| :-------- | :------- | :------------------------- |
| `GET`| Private| Get logged in user|
## Journals
- ### Get All Journals of a User
```http
  GET /api/journals
```

| Request | Access    | Description                |
| :-------- | :------- | :------------------------- |
| `GET`| Private| Get all Journals of a logged in user|

- ### Add a new Journal
```http
  POST /api/journals
```

| Request | Access    | Description                |
| :-------- | :------- | :------------------------- |
| `POST`| Private| Add a new journal|
- ### Edit a Journal
```http
  PUT /api/journals/:id
```

| Request | Access    | Params| Description                |
| :-------- | :------- |:-----| :------------------------- |
| `PUT`| Private|`id`|Edit a journal specified by its `id`|
- ### Delete a Journal
```http
  DELETE /api/journals/:id
```

| Request | Access    | Params| Description                |
| :-------- | :------- |:-----| :------------------------- |
| `DELETE`| Private|`id`|Delete a journal specified by its `id`|
## Share Journals
- ### Display all journals shared with a user
```http
  GET  api/journals/share/
```
| Request | Access    | Description                |
| :-------- | :------- | :------------------------- |
| `GET`| Private| Get all journals shared with the user|
- ### Share your journal with a friend
```http
  POST api/journals/share/:id
```
| Request | Access    | Params| Description                |
| :-------- | :------- |:-----| :------------------------- |
| `POST`| Private|`id`|Share a journal specified by its `id` to a registered user via email (**Required**: Email of the user to share with)|

## Bookmark your Favorite Journal
```http
  PUT api/journals/favorites/:id
```
| Request | Access    | Params| Description                |
| :-------- | :------- |:------| :------------------------- |
| `PUT`| Private|`id`|Mark/Unmark your journals as favorites|
