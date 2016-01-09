---
title: Front React

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

# Front React 문서

고블린클럽 커뮤니티 사이트

- :3000 : Front Server
- :3001 : API Server
- :3002 : Image Server
- :3003 : Document Server

도큐면트 리스트

- [Goblinclub 메인](/) 
- [Api Server 문서](/doc/api)
- [Front Client(React) 문서](/doc/front)
- [Front Server 문서](/doc/goblin)


# 소개

**/scripts** 내부의 폴더에 대해서 정의 합니다. React와 Alt flux로 구성되어 있고 각 Actions, Stores를 정의하고,
React Component를 정의합니다.

GobblinClub의 뷰는 React로 구성되어있습니다.
각 뷰를 표현하는 데이터는 Flux Architecture 를 기반으로 한 Alt Framework 를 사용합니다
Alt는 Action 들과 Store 들로 구성되어 있습니다

데이터는 Store 에 모두 저장되고, Actions 에서 그 데이터들을 조작합니다.
데이터 조회나, 수정, 삭제, 입력시 Actions 내에서 AJAX 요청을 생성하고 받아온 데이터를 Store 에 저장합니다.

## Flux Architecture

![flux](/doc/front/images/flux-diagram-white-background.png)

[Flux](http://facebook.github.io/flux/docs/overview.html#content)

[Alt](http://alt.js.org)

[React](http://facebook.github.io/react/docs/getting-started.html)

## 고블린 클럽의 Architecture

![Gobblinclub Architecture](/doc/front/images/goblinclub-arch.png)

# API 요청

## Diagram

![request-api](/doc/front/images/goblin-request-api.png)

# Resource

## Page Request

서버에서 렌더링 되는 페이지 입니다. 각 Store의 데이터는 페이지 초기 로딩에서 Bootstrap 됩니다. 
따라서 따로 Store 데이터들을 설정할 필요가 없습니다.

| Method | Endpoint | Usage |
|--------|----------|-------|
| GET | / | 고블린 클럽의 메인 페이지. 베스트 리스트를 나타냅니다 |
| GET | /submit | 글 쓰기 페이지 입니다. 사용자는 여기서 글을 쓰고 클럽을 선택합니다 |
| GET | /notFound | 고블린 클럽의 메인 페이지. 베스트 리스트를 나타냅니다 |
| GET | /club/:clubName | 각 클럽의 리스트 페이지 입니다. 리스트가 가지고 있는 글들을 나타냅니다. |
| GET | /club/:clubName/:article | 글을 나타내는 페이지 입니다 url 은 클럽이름 속에 종속됩니다. |

**미완성 페이지**

- | GET | /login | 고블린 클럽의 메인 페이지. 베스트 리스트를 나타냅니다 |
- | GET | /signin | 고블린 클럽의 메인 페이지. 베스트 리스트를 나타냅니다 |
- | GET | /club/:clubName/submit | 클럽에 속한 글 쓰기 페이지 입니다. |
- | GET | /club/:clubName/search | 클럽에 속한 검색 페이지 입니다. |
- /submit/club
- /club
- /search
- /needEmailCode 
- /user
- /user/:id
- /user/:id/history
- /user/:id/clubs
- /user/:id/submitted
- /user/:id/commented
- /user/:id/liked
- /user/:id/dis_liked
- /user/:id/favorated
- /user/:id/saved
- /club/:clubName/:article/comments
- /club/:clubName/:article/comments/:comment
- /user/:id/multiclub/:name
- /user/:id/multiclub/:name/search

## Action's API Call

페이지가 로딩이 되고 난 이후 사용자의 Action에 따라서 Store 데이터를 로드합니다. 

페이지 전체 데이터를 가져오는 것이 아니고, 각 Action에 맞는 데이터를 가져와서 Store 에 setting 합니다.

| Method | Endpoint | Usage | Data |
|--------|----------|-------|-------|
| GET | /best | 베스트 글 리스트를 가져옵니다. | PostStore, ClubStore |
| GET | /notFound | 고블린 클럽의 메인 페이지. 베스트 리스트를 나타냅니다 | UserStore, PostStore, ClubStore |
| GET | /club/:clubName | 각 클럽의 글 리스트 데이터 입니다. 리스트가 가지고 있는 글들을 가져옵니다. | UserStore, PostStore, ClubStore |
| GET | /club/:clubName/:postName | 글을 나타내는 데이터 입니다 url 은 클럽이름 속에 종속됩니다. | UserStore, PostStore, ClubStore |
| POST | /submit | 글 쓰기 요청을 합니다. | post |
| POST | /login | 로그인 요청을 합니다. | user |
| POST | /signin | 회원가입 요청을 합니다. | user |

# Auth

회원은 로그인 할 때 Json Web Token (JWT)를 쿠키에 받으며, 이 토큰은 회원의 서명을 가지고 있습니다.

Cookie 에 저장된 JWT는 매 요청시마다 Front Server 에서 Header에 저장되어 API 요청을 수행합니다.

* 클라이언트에서 토큰은 Action에서 API Client의 Cookie에 저장되어 요청합니다.
* 서버에서 토큰은 Front Server에서 Cookie받아온것을 API Client의 Header에 저장됭어 요청합니다.

토큰을 사용하여 각 요청시마다 Api server에서 Token을 인증하며, 토큰이 잘못 되었을 경우 에러를 반환 합니다.
에러를 받으면 

* 서버에서는 /login 페이지로 Redirect 하며,
* 클라이언트에서는 각 뷰에서 사용자 오류를 보여주고 /login 페이지로 유도 하거나 합니다.


## 회원가입

### Diagram

![signin](/doc/front/images/goblin-signin.png)


## 로그인

### Diagram

![login](/doc/front/images/goblin-login.png)

## 일반 글쓰기 페이지

> /submit

/submit 페이지에 접근하는 것을 뜻합니다. 로그인 하지 않은 회원은 /submit 페이지에 접근 할 수 없습니다.
만약 회원이 임의로 접근할 경우 /login 페이지로 redirect 하며, 클라이언트에서 접근 할 경우 알림 후에 /login 페이지로 안내합니다.

## 회원 정보 페이지

> /user

/user 페이지에 접근하는 것을 뜻합니다. 로그인 하지 않은 회원은 /user 페이지에 접근 할 수 없습니다.
만약 회원이 임의로 접근할 경우 /login 페이지로 redirect 하며, 클라이언트에서 접근 할 경우 알림 후에 /login 페이지로 안내합니다.

## 클럽 만들기 페이지

> /submit/club

/submit/club 페이지에 접근하는 것을 뜻합니다. 로그인 하지 않은 회원은 /submit/club 페이지에 접근 할 수 없습니다.
만약 회원이 임의로 접근할 경우 /login 페이지로 redirect 하며, 클라이언트에서 접근 할 경우 알림 후에 /login 페이지로 안내합니다.

## 댓글쓰기 Action

PostAction#submit을 의미합니다. 로그인 하지 않은 회원은 접근 할 수 없습니다.
만약 회원이 임의로 접근할 경우 /login 페이지로 redirect 하며, 클라이언트에서 접근 할 경우 알림 후에 /login 페이지로 안내합니다.

## 투표하기 Action

CommentAction#submit을 뜻합니다. 로그인 하지 않은 회원은 접근 할 수 없습니다.
만약 회원이 임의로 접근할 경우 /login 페이지로 redirect 하며, 클라이언트에서 접근 할 경우 알림 후에 /login 페이지로 안내합니다.

# React View

# Store

# Action

# Api Client

# Validator



# Front Server -> React Store data 정의

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

