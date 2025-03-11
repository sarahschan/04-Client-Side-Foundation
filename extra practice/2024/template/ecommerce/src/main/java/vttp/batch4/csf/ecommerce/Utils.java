package vttp.batch4.csf.ecommerce;


import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.springframework.stereotype.Component;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonValue;
import vttp.batch4.csf.ecommerce.models.Cart;
import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.models.Product;

@Component
public class Utils {

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  public static Product toProduct(Document doc) {
    Product product = new Product();
    product.setId(doc.getObjectId("_id").toHexString());
    product.setName(doc.getString("ProductName"));
    product.setBrand(doc.getString("Brand"));
    product.setPrice(doc.getDouble("Price").floatValue());
    product.setDiscountPrice(doc.getDouble("DiscountPrice").floatValue());
    product.setImage(doc.getString("Image_Url"));
    product.setQuantity(doc.getString("Quantity"));
    return product;
  }

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  public static JsonObject toJson(Product product) {
    return Json.createObjectBuilder()
      .add("prodId", product.getId())
      .add("name", product.getName())
      .add("brand", product.getBrand())
      .add("price", product.getPrice())
      .add("discountPrice", product.getDiscountPrice())
      .add("image", product.getImage())
      .add("quantity", product.getQuantity())
      .build();
  }


  public Order toOrder(String jsonOrderString) {
    
    // { "name":"sarah",
    //   "address":"123 bedrock",
    //   "priority":false,
    //   "comments":"",
    //   "cart": { 
    //     "lineItems":[
    //       { "prodId":"67ce9ff53b6f736edf551a79",
    //         "quantity":1,
    //         "name":"Glow Assorted Loose Leaf Tea",
    //         "price":1995
    //       },
    //       { "prodId":"67ce9ff53b6f736edf551466",
    //         "quantity":1,
    //         "name":"Masters Blend Tea- Rich Taste",
    //         "price":1500
    //       }
    //   }
    // }

    JsonObject orderJObject = Json.createReader(new StringReader(jsonOrderString)).readObject();

    JsonArray lineItemsJArray = orderJObject.getJsonObject("cart").getJsonArray("lineItems");

    Cart cart = new Cart();

    for (JsonValue lineItemJValue : lineItemsJArray) {
      
      JsonObject lineItemJObject = lineItemJValue.asJsonObject();

      LineItem lineItem = new LineItem();
        lineItem.setProductId(lineItemJObject.getString("prodId"));
        lineItem.setName(lineItemJObject.getString("name"));
        lineItem.setQuantity(lineItemJObject.getInt("quantity"));
        lineItem.setPrice((float) lineItemJObject.getJsonNumber("price").doubleValue());
    
      cart.addLineItem(lineItem);
    }

    Order o = new Order();
      o.setName(orderJObject.getString("name"));
      o.setAddress(orderJObject.getString("address"));
      o.setPriority(orderJObject.getBoolean("priority"));
      o.setComments(orderJObject.getString("comments"));
      o.setCart(cart);

    return o;
  }
}
