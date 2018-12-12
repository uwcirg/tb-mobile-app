require "json"

# Evaluate arbitrary code.
# Unbelievably insecure.
class CodeController < ApplicationController
  skip_before_action :verify_authenticity_token

  def evaluate
    code = params.permit(:code)[:code]

    render json: eval(code)
  end
end
