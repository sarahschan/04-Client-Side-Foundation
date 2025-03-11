package vttp.batch4.csf.ecommerce.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;

@Repository
public class PurchaseOrderRepository {

  @Autowired
  private JdbcTemplate template;

  private static final String INSERT_ORDER = 
    "insert into orders (order_id, date, name, address, priority, comments) values (?, ?, ?, ?, ?, ?)";

  private static final String INSERT_LINE_ITEM = 
    "insert into line_items (product_id, name, quantity, price, order_id) values (?, ?, ?, ?, ?)";
  
  
  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  @Transactional
  public void create(Order order) throws Exception {

    try {
      
      System.out.println(order);

      template.update(INSERT_ORDER, order.getOrderId(), order.getDate(), order.getName(), order.getAddress(), order.getPriority(), order.getComments());
      
      List<LineItem> lineItems = order.getCart().getLineItems();

      for (LineItem lineItem : lineItems) {
        template.update(INSERT_LINE_ITEM, lineItem.getProductId(), lineItem.getName(), lineItem.getQuantity(), lineItem.getPrice(), order.getOrderId());
      }

    } catch (Exception e) {
      throw new RuntimeException("Failed to create order: " + e.getMessage(), e);
    }

  }
}
