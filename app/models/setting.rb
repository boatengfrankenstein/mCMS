class Setting < ApplicationRecord

  cattr_accessor :available_settings
  self.available_settings ||= {}

  def self.theme
    JSON.parse(get_theme.value ||  {theme_style: 'smart-style-0' }.to_json )
  end

  def self.ldap_active?
    false
  end


  def self.get_theme
    where(setting_type: 'cms_theme').first_or_initialize
  end

  def self.theme_style
    theme['theme_style']
  end

  @cached_settings = {}
  @cached_cleared_on = Time.now
  # Returns the value of the setting named name
  def self.[](name)
    v = @cached_settings[name]
    v ? v : (@cached_settings[name] = find_or_default(name).value)
  end

  def self.[]=(name, v)
    setting = find_or_default(name)
    setting.value = (v ? v : "")
    @cached_settings[name] = nil
    setting.save
    setting.value
  end
  # Returns the Setting instance for the setting named name
  # (record found in database or new record with default value)
  def self.find_or_default(name)
    name = name.to_s
    # raise "There's no setting named #{name}" unless available_settings.has_key?(name)
    setting = where(:setting_type => name).order(:id => :desc).first
    unless setting
      setting = new
      setting.setting_type = name
      setting.value = available_settings[name]['default']
    end
    setting
  end

  def self.load_available_settings
    YAML::load(File.open("#{Rails.root}/config/settings.yml")).each do |name, options|
      available_settings[name.to_s] = options
    end
  end
  load_available_settings

  # Defines getter and setter for each setting
  # Then setting values can be read using: Setting.some_setting_name
  # or set using Setting.some_setting_name = "some value"
  # def self.define_setting(name, options={})
  #
  # end

end
