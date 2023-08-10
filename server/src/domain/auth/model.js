module.exports = class SessionModel {
	constructor({
		            sessionId,
		            userId,
		            isActive,
		            ip,
		            browser,
		            os,
		            device,
		            createdAt,
		            updatedAt,
	            }) {
		this.sessionId = sessionId
		this.userId = userId
		this.isActive = isActive
		this.ip = ip
		this.browser = browser
		this.os = os
		this.device = device
		this.createdAt = createdAt
		this.updatedAt = updatedAt
		
	}
}