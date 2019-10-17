import SecurityTokensService from './security/tokens';

async function getTokens(filter) {
	return SecurityTokensService.getTokens(filter);
}

function getTokensBlacklist() {
	SecurityTokensService.getTokensBlacklist()
		.then(data => {
			res.send(data);
		})
		.catch(next);
}

function getSingleToken() {
	SecurityTokensService.getSingleToken(req.params.id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).end();
			}
		})
		.catch(next);
}

async function addToken(data) {
	return SecurityTokensService.addToken(data);
}

function updateToken() {
	SecurityTokensService.updateToken(req.params.id, req.body)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).end();
			}
		})
		.catch(next);
}

function deleteToken() {
	SecurityTokensService.deleteToken(req.params.id)
		.then(data => {
			res.end();
		})
		.catch(next);
}

function sendDashboardSigninUrl() {
	SecurityTokensService.sendDashboardSigninUrl(req)
		.then(data => {
			res.send(data);
		})
		.catch(next);
}

async function getSignedToken(data) {
	return await SecurityTokensService.getSignedToken(data);
}

export default {
	addToken: addToken,
	getTokens: getTokens,
	getSignedToken: getSignedToken
};
