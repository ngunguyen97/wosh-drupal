<?php

namespace Drupal\wosh_checkout\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\image\Entity\ImageStyle;
use Drupal\node\Entity\Node;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\Core\Url;

/**
 * Returns responses for wosh_checkout routes.
 */
class WoshCheckoutController extends ControllerBase {

  /**
   * {@inheritdoc}
   */
  public function getCancelUrl() {
    // @todo Change to media library when #2834729 is done.
    // https://www.drupal.org/node/2834729.
    return Url::fromRoute('<front>')->setAbsolute()->toString();
  }

  /**
   * Builds the response.
   */
  public function build() {

    $nid = \Drupal::request()->query->get('nid');
    $current_user = \Drupal::currentUser();
    /** @var \Drupal\node\Entity\Node $node */
        if(empty($nid) || $current_user->isAnonymous()) {
          return new RedirectResponse($this->getCancelUrl());
        }
    $node = Node::load($nid);
    if (empty($node)) {
      return new RedirectResponse($this->getCancelUrl());
    }

    switch ($node->bundle()) {
      case 'nha_tro':
        $label = $node->getTitle();
        $style = ImageStyle::load('128x80');
        $file = $node->get('field_nha_tro_thumbnail')->entity->getFileUri();;
        $image_url = file_url_transform_relative($style->buildUrl($file));
        $location = $node->get('field_nha_tro_dia_chi')->value;
        $total_price = $node->get('field_nha_tro_num_gia')->value;
        return [
          '#theme' => 'wosh_checkout',
          '#test_var' => $this->t('Test Value'),
          '#label' => $label,
          '#thumbnail' => $image_url,
          '#location' => $location,
          '#total_price' => $total_price,
          '#nid' => $nid,
        ];
        break;
    }


    return new RedirectResponse($this->getCancelUrl());
  }

}
