class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    @messages = @group.messages.includes(:user)
    respomd_to do |format|
      format.html
      format.json { @new_messages = @messages.where('id > ?', params[:id])}
    end
  end
end