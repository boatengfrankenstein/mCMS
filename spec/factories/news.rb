FactoryGirl.define do
  factory :news, class: 'New' do
    title "MyString"
    summary "MyString"
    description "MyText"
    user_id 1
    notes_count 1
  end
end
