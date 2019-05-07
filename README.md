# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|references|null: false, foreign_key: true|
|user_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


##usersテーブル

|Column|Type|Options|
|------|----|-------|
|nickname|string|add_index :users, :nickname, null: false|
|email|string|add_index :users, :email, null: false|

###Association
- has_many :messages
- has_many :members
- has_many :groups, through: :members


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|add_index :groups, :group_name, null: false|

###Association
- has_many :messages
- has_many :members
- has_many :users, through: :members

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

###Association
- belongs_to :group
- belongs_to :user

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
