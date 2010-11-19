var AppAssistant = Class.create({
	initialize: function() {
		this.mainStageName = "MainStage"
	},

	setup: function() {
		this.setInterval("00:00:10")
	},

	handleLaunch: function(parameters) {
		Log.debug("App Launched with " + Object.toJSON(parameters))
		var appController = Mojo.Controller.getAppController()
		var cardStageController = this.controller.getStageController(this.mainStageName)

		if (parameters) {
      this.setInterval("00:00:10")
		}
		else {
			if (cardStageController) {
				cardStageController.activate()
			}
			else {
				this.controller.createStageWithCallback({
					name: this.mainStageName,
					lightweight: true
				},
				function(stageController) {
					stageController.pushScene("login")
				},
				"card")
			}
		}
	},

	setInterval: function(interval) {
		if (interval !== "00:00:00") {
			this.wakeupRequest = new Mojo.Service.Request("palm://com.palm.power/timeout", {
				method: "set",

				parameters: {
					"key": Mojo.appInfo.id + ".update",
					"in": interval,
					"wakeup": true,
					"uri": "palm://com.palm.applicationManager/open",
					"params": {
						"id": Mojo.appInfo.id,
						"params": {
							"action": "update"
						}
					}
				},
				
        onSuccess: function(response) {
					Log.debug("Alarm Set Success " + response.returnValue)
					Feeder.wakeupTaskId = Object.toJSON(response.taskId)
				},
			
        onFailure: function(response) {
					Mojo.Log.info("Alarm Set Failure " + response.returnValue + " " + response.errorText)
				}
			})
		}
	}
})
