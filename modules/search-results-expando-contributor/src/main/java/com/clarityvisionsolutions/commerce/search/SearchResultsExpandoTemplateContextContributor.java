package com.clarityvisionsolutions.commerce.search;

import com.liferay.commerce.product.constants.CPPortletKeys;
import com.liferay.commerce.product.model.CPDefinition;
import com.liferay.commerce.product.service.CPDefinitionLocalService;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.kernel.template.TemplateContextContributor;
import com.liferay.portal.kernel.util.ParamUtil;

import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

@Component(
	property = "type=" + TemplateContextContributor.TYPE_GLOBAL,
	service = TemplateContextContributor.class
)
public class SearchResultsExpandoTemplateContextContributor
	implements TemplateContextContributor {

	@Override
	public void prepare(
		Map<String, Object> contextObjects,
		HttpServletRequest httpServletRequest) {

		String portletId = ParamUtil.getString(httpServletRequest, "p_p_id");

		if (!CPPortletKeys.CP_SEARCH_RESULTS.equals(portletId)) {
			return;
		}

		contextObjects.put(
			"expandoHelper",
			new ExpandoHelper(_cpDefinitionLocalService));
	}

	@Reference
	private CPDefinitionLocalService _cpDefinitionLocalService;

	public static class ExpandoHelper {

		public ExpandoHelper(CPDefinitionLocalService cpDefinitionLocalService) {
			_cpDefinitionLocalService = cpDefinitionLocalService;
		}

		public Object getAttribute(long cpDefinitionId, String attributeName) {
			try {
				CPDefinition cpDefinition =
					_cpDefinitionLocalService.getCPDefinition(cpDefinitionId);

				return cpDefinition.getExpandoBridge().getAttribute(
					attributeName);
			}
			catch (Exception exception) {
				return StringPool.BLANK;
			}
		}

		private final CPDefinitionLocalService _cpDefinitionLocalService;

	}

}
