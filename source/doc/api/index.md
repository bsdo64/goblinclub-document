---
title: API Server

language_tabs:
  - shell
  - ruby
  - python

toc_footers:
  - <a href='#'>Sign Up for a Developer Key</a>
  - <a href='http://github.com/tripit/slate'>Documentation Powered by Slate</a>

includes:
  - errors

search: true
---


# API Server 문서

고블린클럽 커뮤니티 사이트

- :3000 : Front Server
- :3001 : API Server
- :3002 : Image Server
- :3003 : Document Server

도큐면트 리스트

- [Goblinclub 메인](/)
- [Api Server 문서](/doc/api)
- [Front Client 문서](/doc/front)
- [Front Server 문서](/doc/goblin)


# 소개

API Server의 구조와 각 라이브러리들을 소개합니다.



# Database

데이터베이스는 sequelize ORM을 사용하고 있으며, 아래 각 모델들을 가지고 데이터베이스를 쿼리 합니다.

각 모델은 Validation과 필요에 따라 hirarchy 라이브러리를 사용합니다.


## auth

회원의 인증 정보를 나타냅니다.

**Name**: auth

**Column**

| Column | type | default value | allowNull | description |
|--------|------|---------------|-----------|-------------|
| **id** (I, U) | int | **AutoIncrement**  | X | 데이터베이스 튜플 ID |
| userId | int |  | X | 회원의 Id. user 테이블을 참조 합니다.|
| emailVerify | bool | false | X | 가입시 이메일 인증 여부를 나타냅니다.|
| emailVerifyAt | date |  |  | 이메일 인증 시간을 나타냅니다.|
| dropUser | bool | false | X | 회원의 탈퇴 여부를 나타냅니다.|
| dropAt | date |  |  | 회원의 탈퇴 시간을 나타냅니다.|
| loginAt | date |  |  | 회원의 로그인 시간을 나타냅니다.|
| logoutAt | date |  |  | 회원의 로그아웃 시간을 나타냅니다.|
| status | bool | 1: login, 0: logout  |  | 회원의 상태를 나타냅니다.|

**Assosiation**

- auth.userId (1) -- user.id (1)


## club

클럽에 대한 정보를 나타내는 테이블입니다.

**Name**: club

**Column**

| Column | type | default value | allowNull | description |
|--------|------|---------------|-----------|-------------|
| **id** (I, U) | int | **AutoIncrement**  | X | 데이터베이스 튜플 ID |
| name (U) | string |  | X | 클럽의 이름 |
| url (U) | string | false | X | 클럽의 url |
| discription | string |  |  | 클럽의 간단한 설명 |
| type | string |  | X | 클럽의 타입 ('default', 'create') |

**Assosiation**

- club.creator (1) -- user.id (1)
- club.id (n) -- (clubId) **club_post** (postId) -- post.clubId (m)
- club.id (n) -- (clubId) **club_user** (userId) -- user.clubId (m)
- club.id (n) -- (clubId) **subscribe** (userId) -- user.clubId (m)


## club_post

클럽속에 포함된 글

**Name**: club_post

**Column**

| Column | type | default value | allowNull | description |
|--------|------|---------------|-----------|-------------|
| **id** (I, U) | int | **AutoIncrement**  | X | 데이터베이스 튜플 ID |
| clubId (U) | int |  | X | 클럽의 Id |
| postId (U) | string |  | X | 글의 Id |


## club_user

유저가 생성한 클럽을 나타냅니다.

**Name**: club_user

**Column**

| Column | type | default value | allowNull | description |
|--------|------|---------------|-----------|-------------|
| **id** (I, U) | int | **AutoIncrement**  | X | 데이터베이스 튜플 ID |
| clubId (U) | int |  | X | 클럽의 Id |
| userId (U) | int |  | X | 유저의 Id |


## comment

댓글 정보를 나타냅니다.

**Name**: comment

**Column**

| Column | type | default value | allowNull | description |
|--------|------|---------------|-----------|-------------|
| **commentId** (I, U) | string |  | X | 코멘트의 slug 아이디입니다. |
| postId | string |  | X | 포함되는 글의 Id를 나타냅니다. |
| content | text |  | x | 댓글 내용입니다. |
| voteCount | int | 0 | | 투표 총합 입니다. |
| likeCount | int | 0 |  | 좋아요 수 |
| dislikeCount | int | 0 |  | 싫어요 수 |
| deleted | bool | false |  | 글의 삭제 여부를 나타냅니다. |
| deletedAt | date |  |  | 글의 삭제 시간을 나타냅니다. |

**Assosiation**

- comment.author (n) -- user.id (1)
- comment.postId (n) -- post.id (1)
- comment.id (1) -- commentcontent.commentId (1)

**hierarchy** : true


## commentcontent

댓글 첨부자료를 나타냅니다.

**Name**: commentcontent

**Column**

| Column | type | default value | allowNull | description |
|--------|------|---------------|-----------|-------------|
| **id** (I, U) | int | **AutoIncrement**  | X | 데이터베이스 튜플 ID |
| filename | string |  | X | 첨부파일의 파일 이름 |
| ext | string |  | X | 첨부파일의 확장자 |
| contentType | string |  | X | 첨부파일의 content-type |
| size | bigint |  |  | 첨부파일의 크기 |
| uploader | int |  | X | 업로더의 id |
| commentId | string |  | X | comment 테이블의 Id |

**Assosiation**

- commentcontent.uploader (n) -- user.id (1)
- commentcontent.commentId (n) -- comment.id (1)


## post

포스트한 글 데이터를 나타냅니다.

**Name**: post

**Column**

| Column | type | default value | allowNull | description |
|--------|------|---------------|-----------|-------------|
| **uid** (I, U) | string |  | X | 글의 Id는 slug string 값으로 지정합니다. |
| title | string |  | X | 글 제목을 나타냅니다. |
| content | text |  | X | 글 내용을 나타냅니다. |
| deleted | bool | false |  | 글의 삭제 여부를 나타냅니다. |
| deletedAt | date |  |  | 글의 삭제 시간을 나타냅니다. |
| commentCount | int | 0 |  | 글의 댓글 수를 나타냅니다. |
| voteCount | int | 0 | | 투표 총합 입니다. |
| likeCount | int | 0 |  | 좋아요 수 |
| dislikeCount | int | 0 |  | 싫어요 수 |
| author | int |  | X | 회원의 id를 나타냅니다. |

**Assosiation**

- post.author (n) -- user.id (1)
- post.uid (n) -- (postId) **club_post** (clubId) -- club.id (m)
- post.uid (1) -- comment.postId (n)
- post.uid (1) -- postcontent.postId (n)


## postcontent

글에 첨부된 첨부파일을 나타냅니다.

**Name**: postcontent

**Column**

| Column | type | default value | allowNull | description |
|--------|------|---------------|-----------|-------------|
| **id** (I, U) | int | **AutoIncrement**  | X | 데이터베이스 튜플 ID |
| filename | string |  | X | 첨부파일의 파일 이름 |
| ext | string |  | X | 첨부파일의 확장자 |
| contentType | string |  | X | 첨부파일의 content-type |
| size | bigint |  |  | 첨부파일의 크기 |
| uploader | int |  | X | 업로더의 id |
| postId | string |  | X | post 테이블의 Id |

**Assosiation**

- postcontent.uploader (n) -- user.id (1)
- postcontent.postId (n) -- post.id (1)


## subscribe

회원이 구독하는 클럽을 나타냅니다.

**Name**: subscribe

**Column**

| Column | type | default value | allowNull | description |
|--------|------|---------------|-----------|-------------|
| **id** (I, U) | int | **AutoIncrement**  | X | 데이터베이스 튜플 ID |
| clubId (U) | int |  | X | 클럽의 Id |
| userId (U) | int |  | X | 유저의 Id |

**Assosiation**

- subscribe.uploader (n) -- user.id (1)
- subscribe.postId (n) -- post.id (1)


## user

회원 테이블입니다.

**Name**: user

**Column**

| Column | type | default value | allowNull | description |
|--------|------|---------------|-----------|-------------|
| **id** (I, U) | int | **AutoIncrement**  | X | 데이터베이스 튜플 ID |
| email (U) | string |  | X | 회원의 email |
| nick (U) | string |  | X | 회원 닉네임 |
| password | string |  | X | 회원 비밀번호 |

**Assosiation**

- user.id (1) -- auth.userId (1)
- user.id (1) -- post.author (n)
- user.id (1) -- club.creator (n)
- user.id (1) -- vote.liker (n)
- user.id (n) -- (userId) **club_user** (clubId) -- club.id (m)
- user.id (n) -- (userId) **subscribe** (clubId) -- club.id (m)


## user_read

회원이 읽은 글을 나타내는 테이블 입니다.

**Name**: user_read

**Column**

| Column | type | default value | allowNull | description |
|--------|------|---------------|-----------|-------------|
| **id** (I, U) | int | **AutoIncrement**  | X | 데이터베이스 튜플 ID |
| postId (U) | string |  | X | 글 uid |
| userId (U) | int |  | X | 회원 Id |


## vote

회원이 투표한 데이터를 나타냅니다

**Name**: vote

**Column**

| Column | type | default value | allowNull | description |
|--------|------|---------------|-----------|-------------|
| **id** (I, U) | int | **AutoIncrement**  | X | 데이터베이스 튜플 ID |
| votable | string | 'post', 'comment' | X | 투표 종류 (글, 댓글) |
| vitableId | string |  | X | 글의 uid 나 댓글의 id |
| liker | int |  | X | 투표한 회원의 id |
| kind | bool | 1: 'like', 0: 'dislike' | X | 좋아요, 싫어요 |

**Assosiation**

- vote.liker (n) -- user.id (1)


# Router

## ServerSide

## ClientSide

# Library

## Validator

## Composer

## Sender

## Errors

<aside class="notice">
SEO를 목표로 하며, 주소창의 URL 접근시 데이터를 HTML에 삽입하여 React의 State를 Bootstrap 합니다
Composer.Server에서 데이터를 정의하며, 이를 응답 html에 삽입합니다
기본적으로 Interact 하지 않으며 뼈대가 되는 페이지이며, 정해진 데이터를 기준으로만 세팅합니다.(초기세팅)
따라서 대부분 GET 메서드에 의한 페이지 출력에 관여합니다
</aside>    

- 데이터 목록

[/](#kittens) - 메인 페이지. 베스트 자료와 클럽리스트를 나타냅니다 

[/submit](#kittens) - 일반 글쓰기 페이지. 클럽에 종속되지 않습니다 

[/club](#kittens) - 클럽 리스트를 나타냅니다 각종 클럽들을 콜랙션합니다 
 
[/club/{clubname}](#kittens) - clubname에 따른 Post List를 나타냅니다 

[/club/{clubname}/{article}](#kittens) - ID가 article인 clubname에 속하는 Post를 나타냅니다 
 
[/club/{clubname}/submit](#kittens) - 클럽 내 글쓰기 페이지.
 
[/login](#kittens) - 로그인 페이지
 
[/siginin](#kittens) - 회원가입 페이지
 
[/search](#kittens) - 검색 페이지. 클럽 리스트, 글 리스트, 댓글 리스트를 나타냅니다.

## User Interact <-> Api Server AJAX data 정의

<aside class="notice">
사용자의 Interact에 의해서 주고 받는 React Store 데이터에 필요한 데이터를 정의합니다. 
페이지가 될수도 있고, 일반적인 Json Data일 경우도 있습니다
</aside>    

### API 목록

/ : 메인 페이지

- [internal link](#error-code-definitions) external link
    
- [internal link](#error-code-definitions) external link
    
- [internal link](#error-code-definitions) external link
    
- [internal link](#error-code-definitions) external link

/ : 메인 페이지

- [internal link](#error-code-definitions) external link
    
- [internal link](#error-code-definitions) external link
    
- [internal link](#error-code-definitions) external link
    
- [internal link](#error-code-definitions) external link

/ : 메인 페이지

- [internal link](#error-code-definitions) external link
    
- [internal link](#error-code-definitions) external link
    
- [internal link](#error-code-definitions) external link
    
- [internal link](#error-code-definitions) external link

## React Store State 정의

<aside class="notice">
Composer.Server 와 Composer.Client에서 사용되는 React State를 정의 합니다
</aside>    

### UserStore

사용자의 데이터를 저장합니다

```json
{
    "user" : {
        "email" : "bsdo@naver.com",
        "nick" : "고블린클럽"
    },
    "auth" : {
        "state" : "login",
        "loginAt" : 144938283,
        "device" : "Mac OS Chrome"
    }
}
```

Parameter | Default | Type | Description
--------- | ------- | ---- |-----------
user || Object | 회원의 정보를 나타내는 객체
user.email || String | 회원의 이메일
user.nick || String |회원의 닉
auth || Object | 회원의 인증 상태를 나타냅니다
auth.state || String | 회원의 현재 상태 (default : login) 
auth.loginAt || Date | 회원의 접속 시간  
auth.device || String | 회원의 접속 기기 ()

### PostStore

포스트에 관한 데이터를 저장합니다

```json
{
    "bestList" : [{
        "title" : "Hello world",
        "content" : "내용입니다"
    }],
    "postList" : [{
        "title" : "Hello world",
        "content" : "내용입니다"
    }],
    "readingPost" : {
        "title" : "Hello world",
        "content" : "내용입니다"
    },
    "writingPost" : {
        "title" : "Hello world",
        "content" : "내용입니다"
    },
    "userHas" : {
        "postList" : [{
            "title" : "Hello world",        
            "content" : "내용 입니다"        
        }],
        "savedPost" : [{
            "title" : "Hello world",        
            "content" : "내용 입니다"
        }],
        "reportedPost" : [{
            "title" : "Hello world",        
            "content" : "내용 입니다"
        }]
    }
}
```

Parameter | Default | Type | Description
--------- | ------- | ---- |-----------
bestList || Array | 베스트 글 리스트
postList || Array | 클럽 글 리스트
readingPost || Object | 단일 포스트
writingPost || Object | 작성 포스트
userHas || Object | 유저가 작성한 포스트 정보들 나타냅니다

### ClubStore

클럽에 관한 데이터를 저장합니다

```json
{
    "clubNow" : {
        "name" : "오늘의 베스트",
        "type" : "default",
        "url" : "starcraft2",
        "id" : 2,
        "description" : "스타2입니다",
        "creator" : 1
    },
    "defaultClubList" : [{
        "title" : "Hello world",
        "content" : "내용입니다"
    }],
    "hotClubList" : [{
        "title" : "Hello world",
        "content" : "내용입니다"
    }],
    "userHas" : {
        "createdClubList" : [{
            "title" : "Hello world",        
            "content" : "내용 입니다"        
        }],
        "subscribedClubList" : [{
            "title" : "Hello world",        
            "content" : "내용 입니다"
        }]
    }
}
```

Parameter | Default | Type | Description
--------- | ------- | ---- |-----------
clubNow || Object | 현재 클럽 정보
defaultClubList || Array | 디폴트 클럽 리스트
hotClubList || Array | 핫 클럽 리스트
userHas || Object | 유저와 클럽 관계
userHas.createdClubList || Object | 유저가 생성한 클럽
userHas.subscribedClubList || Object | 유저가 가입한 클럽


## API Client

데이터를 전송하는 규약입니다
이때 데이터는 Api Server의 Composer Client로 보내지며, End-point에서 정의된 데이터대로
key : value를 정의하여 보냅니다. 쉽게 말해 React state와 key값을 최대한 동일하게 작성합니다

API는 React method, Store 등 에서 데이터를 규합해서 정리하고 Action에서 validate 이후 APIClient를 통해 API Server와 통신합니다

> 일반적으로 API 데이터는 /ajax 로 호출하며, 이때의 형식은 다음과 같습니다 

```javascript
var request = require('superagent');

var ApiClient = {
    submitPost : (author, post, callback) => {
        request
            .post('/ajax/submit')
            .send({author : author, writingPost: writingPost})
            .set('Accept', 'application/json')
            .withCredentials()
            .end((xhrErr, xhrRes) => {
                if(xhrErr) {
                    callback(xhrErr, null);
                } else if (xhrRes) {
                    callback(null, xhrRes.body);
                }
            })
    }
}
```

# 회원 인증

> To authorize, use this code:

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
```

```shell
# With shell, you can just pass the correct header with each request
curl "api_endpoint_here"
  -H "Authorization: meowmeowmeow"
```

> Make sure to replace `meowmeowmeow` with your API key.

고블린 클럽의 회원 인증은 다음과 같은 단계를 거칩니다

1. 회원가입
  - 아이디, 닉네임, 비밀번호 Form 작성
  - UserAction에서 API Client 로 `/ajax/siginin` 으로 요청
  - API Server에서 데이터를 데이터베이스 입력 후 Email 인증 요청
  - Email 인증이 완료되면, 로그인 세션에 등록하여 회원가입 프로세스를 끝냅니다

2. 로그인
  - 아이디 닉네임 비밀번호 Form 작성
  - UserAction.loginUser 로 `/ajax/login`으로 요청
  - API Server에서 확인 후 세션 등록
  
3. 회원 인증 필수 데이터
  - 페이지 요청시 회원 인증이 필요한 경우 Composer.Server에서 인증합니다
  - 클라이언트에서 AJAX 요청시 필요할 경우 Composer.Client에서 데이터를 받아 Action에서 처리 후, Redirect 처리 합니다 
  

```json
{
  "id": 2,
  "name": "Isis",
  "breed": "unknown",
  "fluffiness": 5,
  "cuteness": 10
}
```

This endpoint retrieves a specific kitten.

<aside class="warning">If you're not using an administrator API key, note that some kittens will return 403 Forbidden if they are hidden for admins only.</aside>

### HTTP Request

`GET http://example.com/kittens/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
ID | The ID of the kitten to retrieve



`Authorization: meowmeowmeow`

<aside class="notice">
You must replace <code>meowmeowmeow</code> with your personal API key.
</aside>

# Kittens

## Get All Kittens

### Hello world

#### Nice to meet you

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.get
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.get()
```

```shell
curl "http://example.com/api/kittens"
  -H "Authorization: meowmeowmeow"
```

> The above command returns JSON structured like this:

```json
[
  {
    "id": 1,
    "name": "Fluffums",
    "breed": "calico",
    "fluffiness": 6,
    "cuteness": 7
  },
  {
    "id": 2,
    "name": "Isis",
    "breed": "unknown",
    "fluffiness": 5,
    "cuteness": 10
  }
]
```

This endpoint retrieves all kittens.

### HTTP Request

`GET http://example.com/api/kittens`

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
include_cats | false | If set to true, the result will also include cats.
available | true | If set to false, the result will include kittens that have already been adopted.

<aside class="success">
Remember — a happy kitten is an authenticated kitten!
</aside>

## Get a Specific Kitten

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.get(2)
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.get(2)
```

```shell
curl "http://example.com/api/kittens/2"
  -H "Authorization: meowmeowmeow"
```

> The above command returns JSON structured like this:

```json
{
  "id": 2,
  "name": "Isis",
  "breed": "unknown",
  "fluffiness": 5,
  "cuteness": 10
}
```

This endpoint retrieves a specific kitten.

<aside class="warning">If you're not using an administrator API key, note that some kittens will return 403 Forbidden if they are hidden for admins only.</aside>

### HTTP Request

`GET http://example.com/kittens/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
ID | The ID of the kitten to retrieve

