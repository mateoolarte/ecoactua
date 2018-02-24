class RegistrationsController < Devise::RegistrationsController

  private

  def sign_up_params
    params.require(:user).permit(:firstname, :lastname, :username, :role, :email, :password)
  end
end