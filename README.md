# OpenWiki API

## About

This is the back-end API that powers the <a href="https://github.com/cooperwhitley/OpenWikiApp">OpenWiki</a>. See below for relevant route tables.

## API

### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/` | `users#changepw`  |
| DELETE | `/sign-out/`        | `users#signout`   |

### Article

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET   | `/articles`             | `articles#index`    |
| POST   | `/articles`             | `articles#create`    |
| GET  | `/articles/<article_id>` | `articles#show`  |
| PATCH  | `/articles/<article_id>` | `articles#update`  |
| DELETE | `/articles/<article_id>`        | `articles#delete`   |

### Article Section

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/articles/<article_id>/sections`             | `section#create`    |
| PATCH  | `/articles/<article_id>/sections/<section_id>` | `section#update`  |
| DELETE | `/articles/<article_id>/sections/<section_id>`| `section#delete`   |

### Article InfoBox

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/articles/<article_id>/infobox`     | `infobox#create`    |
| PATCH  | `/articles/<article_id>/infobox/<infobox_id>` | `infobox#update`  |
| DELETE | `/articles/<article_id>/infobox/<infobox_id>`| `infobox#delete`   |

### Article InfoBox Field

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/articles/<article_id>/infobox/<infobox_id>/fields`     | `infofield#create`    |
| PATCH  | `/articles/<article_id>/infobox/<infobox_id>/fields/<field_id>` | `infofield#update`  |
| DELETE | `/articles/<article_id>/infobox/<infobox_id>/fields/<field_id>`| `infofield#delete`   |

### Photo

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/articles/<article_id>/<sections or infobox>/<_id>/photo`     | `photo#create`    |
| PATCH  | `/articles/<article_id>/<sections or infobox>/<_id>/photo/<photo_id>` | `photo#update`  |
| DELETE | `/articles/<article_id>/<sections or infobox>/<_id>/photo/<photo_id>`| `photo#delete`   |