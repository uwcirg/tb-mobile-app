# API Reference

The API provides the TB mobile application with data,
and manages the relationship with the database.
Its code lives at <https://github.com/uwcirg/tb-api>.

Known API methods are documented here.

## Notes

Patients can create and view private notes in the app.

### Create a note
```
curl \
  -i \
  -X POST \
  http://localhost:5061/api/v1.0/notes \
  -H 'Content-Type: application/json' \
  -d '{
  "author_id": 0,
  "created": "2018-09-20 17:49:13",
  "lastmod": "2018-09-20 17:49:13",
  "patient_id": 88,
  "text": "text note 10"
  }'
```

Response:
```
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 2
Access-Control-Allow-Origin: *
Server: Werkzeug/0.14.1 Python/3.6.6
Date: Mon, 08 Oct 2018 18:13:13 GMT

4
```

Where `4` is the ID of the created note,
if successful.

### Get a specific note
```
curl \
  -i \
  -X GET \
  'http://localhost:5061/api/v1.0/notes/4'
```

Response:
```
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 227
Access-Control-Allow-Origin: *
Server: Werkzeug/0.14.1 Python/3.6.6
Date: Mon, 08 Oct 2018 18:03:50 GMT

{
  "notes": [
    {
      "author_id": 0,
      "created": "Thu, 20 Sep 2018 17:49:13 GMT",
      "id": 4,
      "lastmod": "Thu, 20 Sep 2018 17:49:13 GMT",
      "patient_id": 88,
      "text": "text note 9"
    }
  ]
}
```

### Get all notes for a user
```
curl \
  -i \
  -X GET \
  'http://localhost:5061/api/v1.0/notes?patient_id=88'
```

Response:
```
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 227
Access-Control-Allow-Origin: *
Server: Werkzeug/0.14.1 Python/3.6.6
Date: Mon, 08 Oct 2018 18:04:20 GMT

{
  "notes": [
    {
      "author_id": 0,
      "created": "Thu, 20 Sep 2018 17:49:13 GMT",
      "id": 4,
      "lastmod": "Thu, 20 Sep 2018 17:49:13 GMT",
      "patient_id": 88,
      "text": "text note 9"
    }
  ]
}
```

> Note:
> This route *requires* a `patient_id` parameter.
> Omitting the `patient_id` will not throw an error,
> but returns an empty list, like so:

```
curl \
  -i \
  -X GET \
  'http://localhost:5061/api/v1.0/notes'
```

Response:
```
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 18
Access-Control-Allow-Origin: *
Server: Werkzeug/0.14.1 Python/3.6.6
Date: Mon, 08 Oct 2018 18:02:49 GMT

{
  "notes": []
}
```
