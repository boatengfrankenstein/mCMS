class PlansController < UserCasesController
  before_action :set_plan, only: [:links, :add_action,  :show, :edit, :update, :destroy]

  before_action :authorize_edit, only: [:links, :add_action, :edit, :update]
  before_action :authorize_delete, only: [:destroy]

  # GET /plans
  # GET /plans.json
  def index
    @plans = Plan.visible
  end

  # GET /plans/1
  # GET /plans/1.json
  def show
    @tasks = @plan.tasks
  end

  def links
    @tasks = @plan.tasks
    @available_actions = @plan.available_tasks
  end

  def add_action
    respond_to do |format|
      format.js{
        @task_id = params[:task_id]
        g = @plan.plan_tasks.where(task_id: @task_id)
        if g.present?
          g.delete_all
        else
          @task = Task.find(@task_id)
          @available_actions = @plan.available_tasks
          if @available_actions.include?(@task)
            @plan.plan_tasks<< PlanTask.new(task_id: @task.id, plan_id: @plan.id)
          end
        end
      }
    end
  end
  # GET /plans/new
  def new
    @plan = Plan.new(user_id: User.current.id,
                     case_id: params[:case_id])
  end

  # GET /plans/1/edit
  def edit
  end

  # POST /plans
  # POST /plans.json
  def create
    @plan = Plan.new(plan_params)

    respond_to do |format|
      if @plan.save
        format.html { redirect_to @plan, notice: 'Plan was successfully created.' }
        format.json { render :show, status: :created, location: @plan }
      else
        format.html { render :new }
        format.json { render json: @plan.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /plans/1
  # PATCH/PUT /plans/1.json
  def update
    respond_to do |format|
      if @plan.update(plan_params)
        format.html { redirect_to @plan, notice: 'Plan was successfully updated.' }
        format.json { render :show, status: :ok, location: @plan }
      else
        format.html { render :edit }
        format.json { render json: @plan.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /plans/1
  # DELETE /plans/1.json
  def destroy
    @plan.destroy
    respond_to do |format|
      format.html { redirect_to plans_url, notice: 'Plan was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_plan
    @plan = Plan.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render_404
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def plan_params
    params.require(:plan).permit(Plan.safe_attributes)
  end
  def authorize_edit
    raise Unauthorized unless @plan.can?(:edit_plans, :manage_plans, :manage_roles)
  end

  def authorize_delete
    raise Unauthorized unless @plan.can?(:delete_plans, :manage_plans, :manage_roles)
  end
end
