class ContactPolicy < ApplicationPolicy
  def update?
    contact_policy_condition
  end

  def show?
    contact_policy_condition
  end

  private
  def contact_policy_condition
    user.id === record.user_id
  end
end
