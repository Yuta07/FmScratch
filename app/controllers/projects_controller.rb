class ProjectsController < ApplicationController
  before_action :logged_in_user, only: [:create, :destroy]
  before_action :correct_user, only: :destroy

  def new
  end

  def show
    @user = User.new
    if logged_in?
      @project = current_user.projects.find(params[:id])
      @cards = @project.cards
    end
  end

  def edit
  end

  def create
    project = current_user.projects.build(project_params)
    if project.save
      flash[:success] = "Project created"
      redirect_to root_url
    else
      flash[:error] = "Project creation failure. Title is necessary"
      redirect_to root_url
    end
  end

  def update
  end

  def destroy
    @project.destroy
    flash[:success] = "Project was deleted"
    redirect_to request.referrer || root_url
  end


  #privateメソッド

  #name is project title
  def project_params
    params.require(:project).permit(:name,:picture)
  end

  def correct_user
    @project = current_user.projects.find_by(id: params[:id])
    redirect_to root_url if @project.nil?
  end

end
