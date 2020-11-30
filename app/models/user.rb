class User < ApplicationRecord
  has_secure_password
  has_many :contacts, dependent: :destroy
  has_one :rating, dependent: :destroy
  #validations
  VALID_NAME_REGEX = /\A[A-Za-z]+(?:[ _-][A-Za-z0-9]+)*\z/
  VALID_EMAIL_REGEX = /\A[^@\s]+@[^@\s]+\z/
  VALID_PHONE_REGEX = /\b\d{10}\b/

  validates :username, presence: true, length: { minimum: 2 }, 	format: { with: VALID_NAME_REGEX }
  validates :email, presence: true, uniqueness: { case_sensative: false}, 	format: { with: VALID_EMAIL_REGEX }
  validates :password_digest, presence: true
  validates :phone, uniqueness: true, presence: true, 	format: { with: VALID_PHONE_REGEX }
  validates :country, inclusion: { in: %w(Afghanistan Albania Algeria

Andorra
Angola
Antigua & Deps
Argentina
Armenia
Australia
Austria
Azerbaijan
Bahamas
Bahrain
Bangladesh
Barbados
Belarus
Belgium
Belize
Benin
Bhutan
Bolivia
Bosnia Herzegovina
Botswana
Brazil
Brunei
Bulgaria
Burkina
Burundi
Cambodia
Cameroon
Canada
Cape Verde
Central African Rep
Chad
Chile
China
Colombia
Comoros
Congo
Congo {Democratic Rep}
Costa Rica
Croatia
Cuba
Cyprus
Czech Republic
Denmark
Djibouti
Dominica
Dominican Republic
East Timor
Ecuador
Egypt
El Salvador
Equatorial Guinea
Eritrea
Estonia
Ethiopia
Fiji
Finland
France
Gabon
Gambia
Georgia
Germany
Ghana
Greece
Grenada
Guatemala
Guinea
Guinea-Bissau
Guyana
Haiti
Honduras
Hungary
Iceland
India
Indonesia
Iran
Iraq
Ireland {Republic}
Israel
Italy
Ivory Coast
Jamaica
Japan
Jordan
Kazakhstan
Kenya
Kiribati
Korea North
Korea South
Kosovo
Kuwait
Kyrgyzstan
Laos
Latvia
Lebanon
Lesotho
Liberia
Libya
Liechtenstein
Lithuania
Luxembourg
Macedonia
Madagascar
Malawi
Malaysia
Maldives
Mali
Malta
Marshall Islands
Mauritania
Mauritius
Mexico
Micronesia
Moldova
Monaco
Mongolia
Montenegro
Morocco
Mozambique
Myanmar, {Burma}
Namibia
Nauru
Nepal
Netherlands
New Zealand
Nicaragua
Niger
Nigeria
Norway
Oman
Pakistan
Palau
Panama
Papua New Guinea
Paraguay
Peru
Philippines
Poland
Portugal
Qatar
Romania
Russian Federation
Rwanda
St Kitts & Nevis
St Lucia
Saint Vincent & the Grenadines
Samoa
San Marino
Sao Tome & Principe
Saudi Arabia
Senegal
Serbia
Seychelles
Sierra Leone
Singapore
Slovakia
Slovenia
Solomon Islands
Somalia
South Africa
South Sudan
Spain
Sri Lanka
Sudan
Suriname
Swaziland
Sweden
Switzerland
Syria
Taiwan
Tajikistan
Tanzania
Thailand
Togo
Tonga
Trinidad & Tobago
Tunisia
Turkey
Turkmenistan
Tuvalu
Uganda
Ukraine
United Arab Emirates
United Kingdom
United States
Uruguay
Uzbekistan
Vanuatu
Vatican City
Venezuela
Vietnam
Yemen
Zambia
Zimbabwe),
    message: "%{value} is not a valid country" }

    before_validation :ensure_country_is_capitalize

    def self.getUsersByQuery(query)
      User.all.select do|user| 
        user.username.downcase.starts_with?(query)
      end
    end
 
    private
      def ensure_country_is_capitalize   
        self.country = self.country.capitalize if self.country.present?
      end
end