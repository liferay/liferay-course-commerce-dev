package com.clarityvisionsolutions.commerce.search;

import com.liferay.commerce.product.constants.CPPortletKeys;
import com.liferay.commerce.product.model.CPDefinition;
import com.liferay.commerce.product.service.CPDefinitionLocalService;
import com.liferay.petra.string.StringPool;
import com.liferay.portal.kernel.template.TemplateContextContributor;
import com.liferay.portal.kernel.theme.PortletDisplay;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.WebKeys;

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

		// TODO: Get ThemeDisplay from the request attributes using
		// WebKeys.THEME_DISPLAY. Return early if it is null.

		// TODO: Get PortletDisplay from ThemeDisplay and check whether the
		// current portlet is CPPortletKeys.CP_SEARCH_RESULTS. Return early
		// if it is not.

		// TODO: Put a new ExpandoHelper into contextObjects under the key
		// "expandoHelper", passing _cpDefinitionLocalService to its
		// constructor.
	}

	@Reference
	private CPDefinitionLocalService _cpDefinitionLocalService;

	public static class ExpandoHelper {

		public ExpandoHelper(CPDefinitionLocalService cpDefinitionLocalService) {
			_cpDefinitionLocalService = cpDefinitionLocalService;
		}

		public Object getAttribute(long cpDefinitionId, String attributeName) {

			// TODO: Use _cpDefinitionLocalService to fetch the CPDefinition
			// by cpDefinitionId, then return the expando bridge attribute for
			// attributeName. Return StringPool.BLANK if an exception is thrown.

			return StringPool.BLANK;
		}

		private final CPDefinitionLocalService _cpDefinitionLocalService;

	}

}
