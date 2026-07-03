package com.clarityvisionsolutions.warranty.order.validator;

import com.liferay.commerce.model.CommerceOrder;
import com.liferay.commerce.model.CommerceOrderItem;
import com.liferay.commerce.order.CommerceOrderValidator;
import com.liferay.commerce.order.CommerceOrderValidatorResult;
import com.liferay.commerce.product.model.CPInstance;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.language.LanguageUtil;
import com.liferay.portal.kernel.util.ResourceBundleUtil;

import java.math.BigDecimal;

import java.util.Locale;
import java.util.ResourceBundle;

import org.osgi.service.component.annotations.Component;

/**
 * @author Ricky Pan
 */

/* TODO 1: Set key and order validator priority */

@Component(
    property = {
        "commerce.order.validator.key=",
        "commerce.order.validator.priority:Integer="
    },
    service = CommerceOrderValidator.class
)
public class ClarityWarrantyOrderValidator implements CommerceOrderValidator {

    @Override
    public String getKey() {
        /* TODO 2: Implement method to return the order validator key. */

        return "";
    }

    @Override
    public CommerceOrderValidatorResult validate(
            Locale locale, CommerceOrder commerceOrder, CPInstance cpInstance,
            String json, BigDecimal quantity, boolean child)
        throws PortalException {

        if (cpInstance == null) {
            return new CommerceOrderValidatorResult(true);
        }

        /* TODO 4: Use helper method to return validation result. */

        // The cpInstance object contains a reference to the SKU needed by 
        // the helper method

        return new CommerceOrderValidatorResult(true);
    }

    @Override
    public CommerceOrderValidatorResult validate(
            Locale locale, CommerceOrderItem commerceOrderItem)
        throws PortalException {

        /* TODO 5: Use helper method to return validation result. */

        // The commerceOrderItem contains references to both the order as
        // well as the item SKU needed by the helper method

        return new CommerceOrderValidatorResult(true);
    }

    private CommerceOrderValidatorResult _validateIncompatibility(
        Locale locale, CommerceOrder commerceOrder, String incomingSku) {

        if ((commerceOrder == null) || (incomingSku == null)) {
            return new CommerceOrderValidatorResult(true);
        }

        if (!_WARRANTY_1YR_SKU.equals(incomingSku) &&
            !_WARRANTY_LFT_SKU.equals(incomingSku)) {

            return new CommerceOrderValidatorResult(true);
        }

        String conflictingSku =
            _WARRANTY_1YR_SKU.equals(incomingSku) ? _WARRANTY_LFT_SKU :
                _WARRANTY_1YR_SKU;

        for (CommerceOrderItem item : commerceOrder.getCommerceOrderItems()) {
            if (conflictingSku.equals(item.getSku())) {
                ResourceBundle resourceBundle = ResourceBundleUtil.getBundle(
                    "content.Language", locale, getClass());

                return new CommerceOrderValidatorResult(
                    false,
                    LanguageUtil.format(
                        resourceBundle,
                        "you-cannot-combine-x-and-x-in-the-same-order",
                        new String[] {_WARRANTY_LFT_SKU, _WARRANTY_1YR_SKU}));
            }
        }

        return new CommerceOrderValidatorResult(true);
    }

    /* TODO 3: Set the SKUs to point to the warranty products in your portal. */

    private static final String _WARRANTY_1YR_SKU = "";

    private static final String _WARRANTY_LFT_SKU = "";

}