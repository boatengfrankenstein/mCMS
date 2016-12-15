class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  acts_as_paranoid

 # ldap_authenticatable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable,
         :validatable, :lockable, :omniauthable

  # HAS ONE
  has_one :core_demographic
  accepts_nested_attributes_for :core_demographic

  has_many :chat_rooms, dependent: :destroy
  has_many :messages, dependent: :destroy

  has_one :user_extend_demography
  has_one :job_detail
  belongs_to :role, optional: true

  # HAS MANY
  has_many :affiliations
  has_many :certifications
  has_many :clearances
  has_many :contacts
  has_many :other_skills
  has_many :languages
  has_many :educations
  has_many :documents
  has_many :organizations
  has_many :departments
  has_many :positions
  has_many :tasks
  has_many :assigned_tasks, class_name: 'Task', foreign_key: :assigned_to_id
  has_many :checklist_answers


  has_many :user_attachments, foreign_key: :owner_id
  accepts_nested_attributes_for :user_attachments, reject_if: :all_blank, allow_destroy: true


  before_create do
    self.ldap_authenticatable= '' if self.ldap_authenticatable.to_s.blank?
  end

  after_update :check_status

  validates_uniqueness_of :login, :email
  validates_presence_of :login, :email


  def check_status
    UserMailer.account_activated(self).deliver_now if self.account_active? and self.state_was == false
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.email = "#{auth.uid}@#{auth.provider}.com"
      user.login = "#{auth.uid}@#{auth.provider}.com"
      user.password = Devise.friendly_token[0,20]
      user.ldap_authenticatable= ''
    end
  end

  def self.create_with_jwt_hash(jwt)
    email = jwt['email'].presence || jwt['preferred_username']
    where(provider: 'office365', uid: email).first_or_create do |user|
      user.provider = 'office365'
      user.uid = email
      user.email = email
      user.login = jwt['name']
      user.password = Devise.friendly_token[0,20]
      user.ldap_authenticatable= ''
    end
  end


  def self.visible
    if User.current.allowed_to?(:manage_roles)
      employees
    else
      where(id: User.current.id)
    end
  end

  def visible
    if allowed_to?(:manage_roles)
      User.where(nil)
    else
      User.where(id: User.current.id)
    end
  end

  def self.employees
    User.where(admin: false)
  end

  def has_unread_message(receiver)
    chat_room = ChatRoom.where(user_id: self.id).where(receiver_id: receiver.id).or(ChatRoom.where(user_id: receiver.id).where(receiver_id: self.id)).first
    unless chat_room.message_seen?
      if chat_room.messages.last.user_id != self.id
        chat_room.messages.last.body
      end
    end
  end

  def self.current=(user)
    RequestStore.store[:current_user] = user
  end

  def self.current
    RequestStore.store[:current_user] ||= User.new
  end

  def checklist_template_answers(template_id)
    checklist_answers.where(checklist_template_id: template_id)
  end

  def extend_informations
    user_extend_demography || UserExtendDemography.new(user_id: self.id)
  end


  def allowed_to?(action)
    if action.is_a? Hash
      allowed_actions.include? "#{action[:controller]}/#{action[:action]}"
    else
      permissions.include? action.to_sym
    end
  end

  def has_same_department?(for_user)
    permitted_users.include?(for_user)
  end

  def permitted_users
    @permitted_users ||= begin
      if self.admin?
        User.where(nil)
      elsif !job_detail
        User.where(id: self.id)
      else
        job_detail.department.users
      end
    end
  end

  def all_permissions
    @allowed_permissions ||= begin
      RedCarpet::AccessControl.permissions.collect {|p| p.name}
    end
  end

  def allowed_actions
    @actions_allowed ||= permissions.inject([]) { |actions, permission| actions += RedCarpet::AccessControl.allowed_actions(permission) }.flatten
  end


  def job
    job_detail || JobDetail.new(user_id: self.id)
  end

  def name
    cd = core_demographic
    return login if cd.nil?
    "#{cd.first_name} #{cd.last_name}"
  end

  def profile
    @profile ||= begin
      core_demographic || CoreDemographic.new(user_id: self.id)
    end
  end

  def first_name;  profile.first_name;  end
  def middle_name; profile.middle_name; end
  def last_name;   profile.last_name;   end
  def birthday;    profile.birth_date;  end
  def religion;    profile.religion_type;  end
  def ethnicity;   profile.ethnicity_type;  end
  def citizenship; profile.citizenship_type;  end
  def gender;      profile.gender;      end
  def active?;     self.state ? 'Active' : 'Non active';         end

  def profile_name
    "#{first_name} #{middle_name} #{last_name}".gsub('  ', ' ')
  end


  def profile_image
    if avatar.thumb.url
      avatar.thumb.url
    else
      'male.png'
    end
  end

  def self.safe_attributes
    [:login, :state, :email]
  end

  def self.safe_attributes_with_password_with_core_demographic_without_state
    [:login, :email, :password, :password_confirmation, :role_id,
     core_demographic_attributes: [CoreDemographic.safe_attributes]]
  end

  def self.safe_attributes_with_password
    [:login, :state, :email, :role_id,
     :password, :password_confirmation,
     core_demographic_attributes: [CoreDemographic.safe_attributes]]
  end

  def self.admin_safe_attributes
    [:login, :state, :email, :role_id,
     :password, :password_confirmation,
     :admin, core_demographic_attributes: [CoreDemographic.safe_attributes]]
  end

  def active_for_authentication?
    # Uncomment the below debug statement to view the properties of the returned self model values.
    # logger.debug self.to_yaml

    super && account_active?
  end

  def account_active?; state?; end

  def to_s
    name
  end

  def permissions
    return all_permissions if self.admin?
    if role
      return role.try( :permissions ) || []
    end
    return [] unless job_detail
    job_detail.role.try( :permissions ) || []
  end

  def to_pdf(pdf)
    pdf.font_size(25){  pdf.text "User ##{id}", :style => :bold}
    pdf.image("#{Rails.root}/public/#{avatar.resized.url}") if avatar_url
    pdf.move_down 10
    pdf.text "<b>Login: </b> #{login}", :inline_format =>  true
    pdf.text "<b>Email: </b> #{email}", :inline_format =>  true
    pdf.text "<b>Active: </b> #{state?}", :inline_format =>  true
    pdf.move_down 10
    pdf.font_size(25){  pdf.text "Profile information", :style => :bold}
    pdf.text "<b>Name: </b> #{profile_name}", :inline_format =>  true
    pdf.text "<b>Gender: </b> #{gender}", :inline_format =>  true
    pdf.text "<b>Birthday: </b> #{birthday}", :inline_format =>  true
    pdf.text "<b>Religion: </b> #{religion}", :inline_format =>  true
    pdf.text "<b>Ethnicity: </b> #{ethnicity}", :inline_format =>  true
    pdf.text "<b>Citizenship: </b> #{citizenship}", :inline_format =>  true

    pdf.move_down 10

  end

  def to_pdf_brief_info(pdf)
    pdf.text "User: #{name}  #{birthday}  #{gender} #{active?}", :inline_format =>  true
    pdf.move_down 10
  end

  def pivot_table
    {}
  end

  def self.recently_active
    where('last_seen_at > ?', 5.minutes.ago)
  end

  mount_uploader :avatar, AvatarUploader
end
