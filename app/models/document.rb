class Document < ApplicationRecord
  belongs_to :document_type
  belongs_to :user
  belongs_to :case, optional: true, foreign_key: :related_to_id

  validates_presence_of :title
  scope :not_private, -> {where(is_private: false)}
  scope :not_related, -> {where(related_to_id: nil)}

  has_many :document_notes, foreign_key: :owner_id

  has_many :document_attachments, foreign_key: :owner_id, dependent: :destroy
  accepts_nested_attributes_for :document_attachments, reject_if: :all_blank, allow_destroy: true

  default_scope -> {where(is_private: false).or(where(private_author_id: User.current.id)) }


  after_save :send_notification
  def send_notification
    UserMailer.document_notification(self).deliver_later
  end

  before_create :check_private_author

  def check_private_author
    if self.is_private
      self.private_author_id = User.current.id
    end
  end

  def document_type
    if document_type_id
      super
    else
      DocumentType.default
    end
  end

  def visible?
    User.current == user or User.current.allowed_to?(:edit_documents) or User.current.allowed_to?(:manage_documents)
  end

  def self.safe_attributes
    [:title, :description, :related_to_id, :related_to_type, :user_id, :document_type_id, :date, :private_author_id, :is_private, document_attachments_attributes: [Attachment.safe_attributes]]
  end

  def to_pdf(pdf)
    pdf.font_size(25){  pdf.text "Document ##{id}", :style => :bold}
    user.to_pdf_brief_info(pdf)
    pdf.text "<b>Title: </b> #{title}", :inline_format =>  true
    pdf.text "<b>Description: </b> #{ActionView::Base.full_sanitizer.sanitize(description)}", :inline_format =>  true
    pdf.text "<b>Document type: </b> #{document_type}", :inline_format =>  true
  end

  def for_mail
    output = ""
    output<< "<h2>Document ##{id} </h2>"
    output<< "<b>Title: </b> #{title}<br/>"
    output<< "<b>Description: </b> #{description}<br/>"
    output<< "<b>Document type: </b> #{document_type}<br/>"
    output.html_safe
  end

  def to_s
    title
  end

end
