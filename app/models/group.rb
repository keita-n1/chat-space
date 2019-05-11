class Group < ApplicationRecord
  has_many :group_users
  has_many :messages
  has_many :users, through: :group_users

  validates :name, presence: true

  def show_last_message
    last_message.content && ‘画像が投稿されています’
  end
end
