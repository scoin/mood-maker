class MoodsController < ApplicationController
	def index

	end

	def addimage
		puts params
		render plain: "YES"
	end
end
