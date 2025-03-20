package vttp.batch4.csf.ecommerce.controllers;


import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import vttp.batch4.csf.ecommerce.Utils;
import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@Controller
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  @Autowired
  private Utils utils;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  @PostMapping("/api/order")
  public ResponseEntity<String> postOrder(@RequestBody String jsonOrderString) {

    Order newOrder = utils.toOrder(jsonOrderString);
    System.out.println(newOrder);

    try {
      poSvc.createNewPurchaseOrder(newOrder);
      System.out.println("Order saved");

      JsonObject response = Json.createObjectBuilder()
        .add("orderId", newOrder.getOrderId())
        .build();

      return ResponseEntity.ok().body(response.toString());

    } catch (Exception e) {
      
      System.out.println(e.getMessage());
      e.printStackTrace();

      JsonObject response = Json.createObjectBuilder()
        .add("message", e.getMessage())
        .build();

      return ResponseEntity.status(500).body(response.toString());
    }

  }
}