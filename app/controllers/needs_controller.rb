class NeedsController < ApplicationController
  before_action  :authenticate_user!
  before_action :set_need, only: [:show, :edit, :update, :destroy]
  before_action :authorize, only: [:new, :create]
  before_action :authorize_edit, only: [:edit, :update]
  before_action :authorize_delete, only: [:destroy]


  # GET /needs
  # GET /needs.json
  def index
    @needs = Need.where(user_id: User.current.id)
  end

  # GET /needs/1
  # GET /needs/1.json
  def show
  end

  # GET /needs/new
  def new
    @need = Need.new(user_id: User.current.id,
                     case_id: params[:case_id])
  end

  # GET /needs/1/edit
  def edit
  end

  # POST /needs
  # POST /needs.json
  def create
    @need = Need.new(need_params)

    respond_to do |format|
      if @need.save
        format.html { redirect_to @need, notice: 'Need was successfully created.' }
        format.json { render :show, status: :created, location: @need }
      else
        format.html { render :new }
        format.json { render json: @need.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /needs/1
  # PATCH/PUT /needs/1.json
  def update
    respond_to do |format|
      if @need.update(need_params)
        format.html { redirect_to @need, notice: 'Need was successfully updated.' }
        format.json { render :show, status: :ok, location: @need }
      else
        format.html { render :edit }
        format.json { render json: @need.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /needs/1
  # DELETE /needs/1.json
  def destroy
    @need.destroy
    respond_to do |format|
      format.html { redirect_to needs_url, notice: 'Need was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_need
    @need = Need.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render_404
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def need_params
    params.require(:need).permit(Need.safe_attributes)
  end

  def authorize_edit
    raise Unauthorized unless @need.can?(:edit_needs, :manage_needs, :manage_roles)
  end

  def authorize_delete
    raise Unauthorized unless @need.can?(:delete_needs, :manage_needs, :manage_roles)
  end
end