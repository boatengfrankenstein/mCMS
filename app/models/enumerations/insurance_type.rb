class InsuranceType < Enumeration
  has_many :user_insurances

  OptionName = :enumeration_insurance_type

  def option_name
    OptionName
  end

  def objects
    UserInsurance.where(:insurance_type_id => self.id)
  end

  def objects_count
    objects.count
  end

  def transfer_relations(to)
    objects.update_all(:insurance_type_id => to.id)
  end
end