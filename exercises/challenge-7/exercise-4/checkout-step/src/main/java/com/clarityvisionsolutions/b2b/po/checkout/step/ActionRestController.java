/**
 * SPDX-FileCopyrightText: (c) 2024 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.clarityvisionsolutions.b2b.po.checkout.step;

import com.liferay.client.extension.util.spring.boot3.BaseRestController;

import org.json.JSONObject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Ricky Pan
 */
@RequestMapping("/action")
@RestController
public class ActionRestController extends BaseRestController {

	@PostMapping
	public ResponseEntity<String> post(
		@AuthenticationPrincipal Jwt jwt, @RequestBody String json) {

		JSONObject jsonObject = new JSONObject(json);

		java.net.URI uri = java.net.URI.create(
			"REPLACE API URL" + 
			jsonObject.getLong("commerceOrderId")
		);

		String body = new JSONObject()
			.put("purchaseOrderNumber", jsonObject.getString("REPLACE WITH INPUT FIELD ID"))
			.toString();

		return new ResponseEntity<>(
			patch("Bearer " + jwt.getTokenValue(), body, uri),
			HttpStatus.OK
		);
	}

}
