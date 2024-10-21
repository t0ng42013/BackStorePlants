import { Router } from "express";
import { getAllOrders } from "../controllers/orderController";

const router = Router();

router.get('/', getAllOrders);